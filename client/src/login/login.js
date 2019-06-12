import React, { useEffect } from 'react';
import api from '../api-client';
import './login.less'


function Login(props) {

  useEffect(() => {
    api.getTokens()
      .then(res => res.json())
      .then(res => api.refreshTokens(res))
      .then(res => res.json())
      .then(res => window.localStorage.setItem('accessToken', res))
      .then(res => props.history.push('/'))
      .catch(e => console.log(e));
  })

  return (
    <div className="container">
      <a href='http://localhost:4000/login'><button className="login">Login with spotify</button></a>
    </div>
  );
}

export default Login;
