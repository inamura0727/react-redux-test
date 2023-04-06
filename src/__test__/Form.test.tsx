import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import { Provider } from 'react-redux';

describe('Rendering', () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: todoReducer,
      },
    });
  });
  it('should render all the element correctly', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>,
    );
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(
      screen.getByPlaceholderText('Input things you have to do'),
    ).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });
});

describe('Input from onChange event', () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: todoReducer,
      },
    });
  });
  it('should update input value correctly', async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>,
    );
    const inputValue: HTMLInputElement = screen.getByPlaceholderText(
      'Input things you have to do',
    );
    await userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
});
