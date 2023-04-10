import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchJSONServerGet,
  selectStatus,
  fetchJSONDelete,
} from '../features/todo/todoSlice';
import { AppDispatch } from '../store';

const DeleteBtn = ({ id }: { id: string }) => {
  const dispacth = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);

  const handleClikc = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    act(() => {
      dispacth(fetchJSONDelete(id));
    });
  };

  return (
    <div>
      <button data-testid={`delete-btn-${id}`} onClick={handleClikc}>
        削除
      </button>
    </div>
  );
};

export default DeleteBtn;
