import React from 'react';
import './user-info.less';

function UserInfo({userInfo}) {

  return (
    <div className="info">
      <p>Welcome <strong>{userInfo.display_name}</strong></p>
    </div>);
}

export default UserInfo;
