import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Todolist from './components/Todolist';
import UserInfo from './components/UserInfo';

function App() {
  return (
    <div className="App">
      <UserInfo />
      <Form />
      <Todolist />
    </div>
  );
}

export default App;
