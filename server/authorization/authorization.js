const { client_id, client_secret, redirect_uri } = require('../config');
const url = 'https://accounts.spotify.com/api/token';
const request = require('request-promise');
const btoa = require('btoa');

exports.getAccess = (req, res) => {
  const scopes = 'streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
}

exports.getTokens = (code) => {
  const authOptions = {
    url: url,
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    json: true
  };
  return request.post(authOptions)
}

exports.refreshTokens =  (token) => {
  const authOptions = {
    url: url,
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: token
    },
    json: true
  };
  return request.post(authOptions)

}
