const { client_id, redirect_uri, scopes } = require('../config');
const Model = require('../db/connection');
const api = require('../api-client');

exports.getAccess = (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
}

exports.getPlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Model.Song.find({bpm: +id});
    res.send(response);
  } catch (e) {
    res.status(500);
  }
}
exports.setPlay = async (req, res) => {
  const playlist = req.params.playlist.split(',');
  const { token } = req;
  try {
    await api.setPlay(token, playlist);
    res.status(200).end();
  } catch(e) {
    res.status(500).end();
  }
}

exports.getUserData = async (req, res) => {
  const { token } = req;
  try {
    const response = await api.getUserData(token);
    res.status(200).send(response);
  } catch(e) {
    res.status(500);
  }
}

exports.transferPlayback = async (req, res) => {
  const { token } = req;
  const { deviceId } = req.params;
  try {
    await api.transferPlayback(token, deviceId);
    res.status(200).end();
  } catch(e) {
    res.status(500).end();
  }
}

exports.getTokens = async (req, res) => {
  const code = req.query.code;
  try {
    const { refresh_token } = await api.getTokens(code);
    res.status(200).json(refresh_token);
  } catch(e) {
    res.status(500).end();
  }
}

exports.refreshTokens = async (req, res) => {
  const { token } = req;
  try {
    const { access_token } = await api.refreshTokens(token);
    res.status(200).json(access_token);
  } catch(e) {
    res.status(500).end();
  }
}

// USED FOR DATABASE SEEDING
// exports.saveSongs = (req, res) => {
//   try {
//     console.log('here');
//     req.body.forEach(async song => {
//       song = new Model.Song({
//         album_artists_href: song.track.album.artists[0].href,
//         album_artists_name: song.track.album.artists[0].name,
//         album_href: song.track.album.href,
//         album_cover_url: song.track.album.images[1].url,
//         album_name: song.track.album.name,
//         album_id: song.track.album.id,
//         song_name: song.track.name,
//         duration_ms: song.track.duration_ms,
//         song_href: song.track.href,
//         song_id: song.track.id,
//         bpm: 171
//       })
//       await song.save();
//     })
//     res.sendStatus(200);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// }
