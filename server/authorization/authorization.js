const client_id = '8bcddab633c447df9731da38ef655ecf';
const client_secret = '0be10090cb3c4a958221c4365f4740e6';
const redirect_uri = 'http://localhost:3000';

exports.getAccess = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
}
