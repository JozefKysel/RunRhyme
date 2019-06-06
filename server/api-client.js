const axios = require('axios');
const JSON = require('circular-json');
const auth = require('./authorization/authorization');

exports.getPlaylist = async (req, res) => {
  try {
    const data = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        'Authorization': `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json'
        }
    });
    res.send(JSON.stringify(data));
    res.status(200);
  } catch (e) {
    res.status(500);
  }
}
