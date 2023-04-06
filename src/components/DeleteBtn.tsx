import React from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchJSONServerGet,
  selectStatus,
  fetchJSONDelete,
} from '../features/todo/todoSlice';
import { AppDispatch } from '../store';

const DeleteBtn = ({ id }: { id: string }) => {
  const dispacth = useDispatch<AppDispatch>();

  const handleClikc = async () => {
    await dispacth(fetchJSONDelete(id));
  };
  return (
    <div>
      <button onClick={handleClikc}>削除</button>
    </div>
  );
};

export default DeleteBtn;
