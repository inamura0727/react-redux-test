import axios from 'axios';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchJSONPost,
  fetchJSONServerGet,
  selectStatus,
  selectTodos,
} from '../features/todo/todoSlice';
import { AppDispatch } from '../store';
import Spinner from './Spinner';

const Form = () => {
  const [text, setText] = useState('');
  const [isWritten, setIsWritten] = useState(false);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);

  const handleCahnge = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // actで囲んでってエラーが出たので...
    act(() => setText(e.target.value));
  };

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (text === '') {
      act(() => setIsWritten(true));
      return;
    }
    const res = await dispatch(fetchJSONPost(text));
    // 追加したらあとにもう一度データ取得する
    // await dispatch(fetchJSONServerGet());
    setIsWritten(false);
    setText('');
  };

  return (
    <div>
      <h1 className="title">TODO LIST</h1>
      <form action="">
        <input
          type="text"
          placeholder="Input things you have to do"
          onChange={handleCahnge}
          value={text}
        />
        <div className="btn_wrapper">
          {isWritten && (
            <p className="alermText">Please fill something in this form!</p>
          )}
          <button data-testid="post-btn" className="btn" onClick={handleClick}>
            Add
          </button>
          {status === 'Pending' && <Spinner />}
        </div>
      </form>
    </div>
  );
};

export default Form;
