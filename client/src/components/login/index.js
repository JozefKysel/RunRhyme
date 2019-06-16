import React, { useEffect } from 'react';
import api from '../../api-client';
import './login.less'


function Login(props) {

  const saveTokenAndRedirect = (res) => {
    window.localStorage.setItem('accessToken', res);
    props.history.push('/');
  }

  useEffect(() => {
    api.getTokens()
      .then(res => res.json())
      .then(res => api.refreshTokens(res))
      .then(res => res.json())
      .then(res => saveTokenAndRedirect(res))
      .catch(e => console.log(e));
  });

  return (
    <div className="container">
      <a href='http://localhost:4000/login'><button className="login">Login with spotify</button></a>
    </div>
  );
}

export default Login;
