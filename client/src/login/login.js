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

  return (
    <div className="container">
      <div className="appname">bpmPlaylist</div>
      <img className="logo" src="https://d2itjpllv9u9m3.cloudfront.net/wp-content/uploads/2016/10/19110124/Exercise.jpg"/>
      <a href='http://localhost:4000/login'><img className="login" src="https://uptune.herokuapp.com/assets/login-button-mobile-82c2ef9bca0473f7f2ce860eca70cfb7318b25edf58d27994a0a5f5ae1a5d6f4.png"/></a>
    </div>
  );
}

export default Login;
