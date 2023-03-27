import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTodos,
  selectAmount,
  fetchJSONServerGet,
  selectStatus,
} from '../features/todo/todoSlice';
import { AppDispatch } from '../store';

const Todolist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(selectTodos);
  const amount = useSelector(selectAmount);
  const status = useSelector(selectStatus);
  console.log(status)

  return (
    <div>
      <h1>Todolist</h1>
      <button onClick={() => dispatch(fetchJSONServerGet())}>
        fetchJSONServer
      </button>
      <div>
        <p>Total todos: {amount}</p>
      </div>
      {status === 'Fetch Failed' && (
        <p data-testid="fetchFailed" className="alermText">
          Fetch Failed
        </p>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}{' '}
            <span>{todo.completed ? <p>done </p> : <p>not yet</p>}</span>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
