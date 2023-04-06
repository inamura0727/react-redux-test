import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTodos,
  selectAmount,
  fetchJSONServerGet,
  selectStatus,
} from '../features/todo/todoSlice';
import { AppDispatch } from '../store';
import DeleteBtn from './DeleteBtn';
import Form from './Form';

const Todolist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(selectTodos);
  const amount = useSelector(selectAmount);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchJSONServerGet());
  }, [dispatch]);

  console.log(todos);
  return (
    <div>
      <Form />
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
            {todo.todo}
            <span>{todo.completed ? <p>done </p> : <p>not yet</p>}</span>
            <DeleteBtn id={todo.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
