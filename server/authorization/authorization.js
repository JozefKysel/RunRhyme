
const redirect_uri = 'http://localhost:3000';
const url = 'https://accounts.spotify.com/api/token';
const request = require('request');
const atob = require('atob');
const btoa = require('btoa');

exports.getAccess = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
}

exports.getTokens = (req, res) => {
  const code = req.query.code;
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
  request.post(authOptions, (error, response, body) => {
    res.send(JSON.stringify(body.refresh_token));
  })
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
      res.send(JSON.stringify(body.access_token))
      res.status(200);
    });
  } catch(e) {
    res.status(500);
  }
}
