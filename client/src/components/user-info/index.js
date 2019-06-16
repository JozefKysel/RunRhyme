import React from 'react';
import './user-info.less';

function UserInfo({userInfo}) {
  return (
    <div className="info">
      <img className='avatar' src='https://avatars3.githubusercontent.com/u/33122888?s=400&v=4' alt="user"/>
      <p>You are signed as </p>
      <p className="name" >{userInfo.display_name}</p>
    </div>);
}

export default UserInfo;
