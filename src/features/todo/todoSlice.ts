import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { stat } from 'fs';
import { Todo } from '../../../types/todo';

const initialState = {
  todos: [
    {
      id: '',
      todo: '',
      completed: false,
    },
  ],
  amount: 0,
  status: '',
};

// わざとpending状態にしたいがための関数
const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const fetchJSONServerGet = createAsyncThunk('fetch/apiGET', async () => {
  const res = await axios.get('http://localhost:8000/todos');
  return res.data;
});

const createUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (a) => {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const fetchJSONPost = createAsyncThunk(
  'fetch/apiPOST',
  async (req: string): Promise<Todo> => {
    // uuid作成
    let id = createUuid();

    const res = await axios.post('http://localhost:8000/todos', {
      id: id,
      todo: req,
      completed: false,
    });
    const data = res.data;
    return data;
  },
);

export const fetchJSONDelete = createAsyncThunk(
  'fetch/apiDelete',
  async (id: string) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    return id;
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJSONServerGet.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.amount = action.payload.length;
      state.status = 'Succeded!';
    });
    builder.addCase(fetchJSONServerGet.rejected, (state, action) => {
      state.status = 'Fetch Failed';
    });
    builder.addCase(fetchJSONServerGet.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(fetchJSONPost.fulfilled, (state, action) => {
      state.todos = [...state.todos, action.payload];
      state.status = 'Succeded!';
    });
    builder.addCase(fetchJSONPost.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(fetchJSONPost.rejected, (state, action) => {
      state.status = 'Fatch Failed';
    });
    builder.addCase(fetchJSONDelete.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.status = 'Succeded!';
    });
    builder.addCase(fetchJSONDelete.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(fetchJSONDelete.rejected, (state, action) => {
      state.status = 'Fatch Failed';
    });
  },
});

export const selectTodos = (state: { todo: { todos: Todo[] } }) =>
  state.todo.todos;
export const selectAmount = (state: { todo: { amount: number } }) =>
  state.todo.amount;
export const selectStatus = (state: { todo: { status: string } }) =>
  state.todo.status;

export default todoSlice.reducer;
