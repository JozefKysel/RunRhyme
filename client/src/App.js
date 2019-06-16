import React from 'react';
import { Dashboard, Login, PrivateRoutes } from './components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes component={Dashboard} exact path='/'/>
        <Route path='/login' component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
