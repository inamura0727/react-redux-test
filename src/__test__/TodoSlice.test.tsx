import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { AnyAction, configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import Todolist from '../components/Todolist';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const server = setupServer(
  rest.get('http://localhost:8000/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 0, todo: 'Dummy', completed: false }]),
    );
  }),
);

beforeEach(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(async () => server.close());

describe('Redux Async API Mocking', () => {
  let store: ToolkitStore<
    { todo: { todos: string[] } },
    AnyAction,
    [ThunkMiddleware]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: todoReducer,
      },
    });
  });
  it('[fetch failed] should display todos in ul tag', async () => {
    render(
      <Provider store={store}>
        <Todolist />
      </Provider>,
    );
    expect(screen.queryByRole('listitem')).toBeNull();
    await userEvent.click(screen.getByText('fetchJSONServer'));
    expect(
      await screen.findByText((content, element) => {
        /*2つの引数contentとelementを受け取る。contentは検索対象のテキスト、elementは現在の要素です。この関数では、要素がliタグであり、テキストがDummyである場合に、要素が一致したとみなす*/
        return element?.tagName.toLowerCase() === 'li' && content === 'Dummy';
      }),
    ).toBeInTheDocument();
  });
});
