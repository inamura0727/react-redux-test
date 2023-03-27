import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJSONPost, selectStatus } from '../features/todo/todoSlice';
import { AppDispatch } from '../store';
import Spinner from './Spinner';

const Form = () => {
  const [text, setText] = useState('');
  const [isWritten, setIsWritten] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);
  console.log(status);

  const handleCahnge = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // actで囲んでってエラーが出たので...
    act(() => setText(e.target.value));
  };

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (text === '') {
      setIsWritten(true);
      return;
    }
    dispatch(fetchJSONPost(text));
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
          <button className="btn" onClick={handleClick}>
            Add
          </button>
          {status === 'Pending' && <Spinner />}
        </div>
      </form>
    </div>
  );
};

export default Form;
