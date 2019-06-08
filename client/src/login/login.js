import React, { useEffect } from 'react';
import api from '../api-client';
import './login.css'


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

  return (<a href='http://localhost:4000/login'><button>Log In</button></a>)
}

export default Login;
