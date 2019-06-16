const request = require('request-promise');

exports.setPlay = (token, playlist) => {
  const requestOpt = {
    url: `https://api.spotify.com/v1/me/player/play`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    json: {
      "uris": playlist
    }
  }
  return request.put(requestOpt);
}
exports.getUserData = (token) => {
  const requestOpt = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return request.get(requestOpt);
}

exports.transferPlayback = (token, deviceId) => {
  const requestOpt = {
    uri: 'https://api.spotify.com/v1/me/player',
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'device_ids': [deviceId],
      'play': false,
    })
  }
  return request.put(requestOpt);
}

// USED FOR DATABASE SEEDING
// exports.getPlaylist = async (req, res) => {
//   const access_token = atob(req.headers.authorization.split(' ')[1]);
//   const playlistID = req.params.id;
//   try {
//     const data = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
//       headers: {
//         'Authorization': `Bearer ${access_token}`,
//         'Content-Type': 'application/json'
//         }
//     });
//     res.send(JSON.stringify(data));
//     res.status(200);
//   } catch (e) {
//     res.status(500);
//   }
// }
