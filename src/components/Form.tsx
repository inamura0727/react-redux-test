import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';

const Form = () => {
  const [text, setText] = useState('');

  const handleCahnge = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // actで囲んでってエラーが出たので...
    act(()=>setText(e.target.value));
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
          <button className="btn">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
