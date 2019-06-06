const axios = require('axios');
const JSON = require('circular-json');
const auth = require('./authorization/authorization');
const atob = require('atob');

exports.getPlaylist = async (req, res) => {
  const access_token = atob(req.headers.authorization.split(' ')[1]);
  try {
    const data = await axios.get(`https://api.spotify.com/v1/playlists/59ZbFPES4DQwEjBpWHzrtC`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
        }
    });
    res.send(JSON.stringify(data));
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
