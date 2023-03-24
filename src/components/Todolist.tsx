import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTodos,
  selectAmount,
  fetchJSONServerGet,
} from '../features/todo/todoSlice';
import { AppDispatch } from '../store';

const Todolist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(selectTodos);
  const amount = useSelector(selectAmount);
  
  return (
    <div>
      <h1>Todolist</h1>
      <button onClick={() => dispatch(fetchJSONServerGet())}>
        fetchJSONServer
      </button>
      <div>
        <p>Total todos: {amount}</p>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}{' '}
            <span>{todo.completed ? <p>done </p> : <p>not yet</p>}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
