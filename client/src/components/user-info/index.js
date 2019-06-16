import React from 'react';
import './user-info.less';

function UserInfo({userInfo}) {

  return (
    <div className="info">
      <p>You are signed as </p>
      <p className="name" >{userInfo.display_name}</p>
    </div>);
}

export default UserInfo;
