import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  amount: 0,
  failed: '',
};

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export const fetchJSONServerGet = createAsyncThunk('fetch/apiGET', async () => {
  const res = await axios.get('http://localhost:8000/todos');
  return res.data;
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJSONServerGet.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.amount = action.payload.length;
    });
    builder.addCase(fetchJSONServerGet.rejected, (state, action) => {
      state.failed = 'Fetch Failed';
    });
  },
});

export const selectTodos = (state: { todo: { todos: Todo[] } }) =>
  state.todo.todos;
export const selectAmount = (state: { todo: { amount: number } }) =>
  state.todo.amount;
export const selectFailed = (state: { todo: { failed: string } }) =>
  state.todo.failed;

export default todoSlice.reducer;
