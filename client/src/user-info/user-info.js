import React from 'react';

function UserInfo({userInfo}) {
  return (
    <div>
      <p>You are signed as {userInfo.display_name}</p>
    </div>)
}

export default UserInfo;
