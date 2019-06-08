const client_id = '8bcddab633c447df9731da38ef655ecf';
const client_secret = '0be10090cb3c4a958221c4365f4740e6';
const redirect_uri = 'http://localhost:3000/login';
const url = 'https://accounts.spotify.com/api/token';
const request = require('request');
const atob = require('atob');
const btoa = require('btoa');

exports.getAccess = (req, res) => {
  const scopes = 'streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state';
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

exports.refreshTokens =  (req,res) => {
  const refresh_token = atob(req.headers.authorization.split(' ')[1]);
  try {
    const authOptions = {
      url: url,
      headers: {'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)},
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
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
