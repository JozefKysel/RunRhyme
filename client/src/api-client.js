const params = window.location.search;
const btoa = require('btoa');
exports.getTokens = () => fetch(`http://localhost:4000/tokens/${params}`);
exports.getPlaylist = (token) => fetch('http://localhost:4000/playlist', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + btoa(token)
  }
});
exports.refreshTokens = (token) => fetch(`http://localhost:4000/refresh_token`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + btoa(token)
  }
});
