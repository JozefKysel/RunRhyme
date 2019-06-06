const client_id = '8bcddab633c447df9731da38ef655ecf';
const client_secret = '0be10090cb3c4a958221c4365f4740e6';
const redirect_uri = 'http://localhost:3000';
const request = require('request');
const url = 'https://accounts.spotify.com/api/token';
let refresh_token;
let access_token;

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
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };
  request.post(authOptions, (error, response, body) => {
    exports.access_token = body.access_token;
    exports.refresh_token = body.refresh_token;
  })
}
