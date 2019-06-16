const { client_id, client_secret, redirect_uri } = require('../config');
const url = 'https://accounts.spotify.com/api/token';
const request = require('request');
const btoa = require('btoa');

exports.getAccess = (req, res) => {
  const scopes = 'streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
}

exports.getTokens = (req, res) => {
  try {
    const authOptions = {
      url: url,
      form: {
        code: req.query.code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      json: true
    };
    request.post(authOptions, (error, response, body) => {
      res.status(200);
      res.send(JSON.stringify(body.refresh_token));
    });
  } catch (e) {
    res.status(500);
  }
}

exports.refreshTokens =  (req, res) => {
  try {
    const authOptions = {
      url: url,
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: req.token
      },
      json: true
    };
    request.post(authOptions, (err, response, body) => {
      res.send(JSON.stringify(body.access_token));
      res.status(200);
    });
  } catch(e) {
    res.status(500);
  }
}
