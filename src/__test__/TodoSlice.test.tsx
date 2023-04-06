import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import Todolist from '../components/Todolist';

const handlers = [
  rest.get('http://localhost:8000/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      // 配列で渡されるので、配列に入れた形にする
      ctx.json([{ id: 0, todo: 'Dummy', completed: false }]),
    );
  }),
  rest.post('http://localhost:8000/todos', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'test',
        todo: 'test',
        completed: false,
      }),
    );
  }),
  rest.post('http://localhost:8000/todos', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(async () => server.close());

describe('Redux Async API Mocking', () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: todoReducer,
      },
    });
  });
  it('1: should render all the elemnt creectly', () => {
    render(
      <Provider store={store}>
        <Todolist />
      </Provider>,
    );
    expect(screen.getByText('TODO LIST')).toBeInTheDocument();
  });
  it('2: should render the list of todos from REST API', async () => {
    render(
      <Provider store={store}>
        <Todolist />
      </Provider>,
    );
    expect(screen.queryByText('Dummy')).toBeNull();
    expect(await screen.findByText('Dummy')).toBeInTheDocument();
  });
  it('3: should add new todo and also to the list', async () => {
    render(
      <Provider store={store}>
        <Todolist />
      </Provider>,
    );
    expect(screen.queryByText('test')).toBeNull();
    const inputValue = screen.getByPlaceholderText(
      'Input things you have to do',
    );
    await userEvent.type(inputValue, 'test');
    await userEvent.click(screen.getByTestId('post-btn'));
    expect(await screen.findByText('test')).toBeInTheDocument();
  });
});
