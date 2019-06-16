import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoutes({component: Component}) {
  return (
    <Route
    render={props => {
      return window.localStorage.getItem('accessToken') ? <Component {...props}/>
      : (<Redirect to='login'/>)
    }}/>
  );
}

export default PrivateRoutes;
