import React from 'react';
import Dashboard from './dashboard/dashboard';
import Login from './login/login';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Dashboard} exact/>
      <Route path='/login' component={Login}/>
    </BrowserRouter>
  );
}

export default App;
