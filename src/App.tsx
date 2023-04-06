import React from 'react';
import './App.css';
import Form from './components/Form';
import Todolist from './components/Todolist';
import { TodoListUseEffect } from './components/Todolist-useEffect';
import UserInfo from './components/UserInfo';


function App() {

  return (
    <div className="App">
      <UserInfo />
      <Todolist />
    </div>
  );
}

export default App;
