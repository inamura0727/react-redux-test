import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Todolist from './components/Todolist';

function App() {
  return (
    <div className="App">
      <Form />
      <Todolist />
    </div>
  );
}

export default App;
