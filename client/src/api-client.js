const params = window.location.search;

exports.getAccess = () => fetch(`http://localhost:4000/login`);
exports.getTokens = () => fetch(`http://localhost:4000/tokens/${params}`);
exports.getPlaylist = (intensity) => fetch(`http://localhost:4000/playlist/${intensity}`);

exports.refreshTokens = (token) => fetch(`http://localhost:4000/refresh_token`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

exports.getUserData = () => fetch('http://localhost:4000/userdata', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
  }
});

exports.setPlay = (playlist) => fetch(`http://localhost:4000/setplay/${playlist}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
  }
});

exports.transferPlayback = (deviceId) => fetch(`http://localhost:4000/transfer/${deviceId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
  }
})

// USED FOR DATABASE SEEDING
// exports.saveSongs = (songs) => {
//   fetch(`http://localhost:4000/seed`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(songs)
//   })
// }
