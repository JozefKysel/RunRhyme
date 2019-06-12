const Model = require('../db/connection');

exports.getPlaylist = async (req, res) => {
  const params = req.params.id;
  try {
    const response = await Model.Song.find({bpm: +req.params.id});
    res.send(response);
  } catch (e) {
    res.status(500);
  }
}

exports.deleteSong = async (req, res) => {
  try {
    const song = req.body;
    await Model.MySong.deleteOne({song_id: song._id});
  } catch (e) {
    res.status(500);
  }
}

exports.saveSong = async (req, res) => {
  try {
    const song = req.body;
    const mySong = new Model.MySong({
      album_artists_href: song.album_artists_href,
      album_artists_name: song.album_artists_name,
      album_href: song.album_href,
      album_cover_url: song.album_cover_url,
      album_name: song.album_name,
      album_id: song.album_id,
      song_name: song.song_name,
      duration_ms: song.duration_ms,
      song_href: song.song_href,
      song_id: song.song_id,
      bpm: song.bpm,
      my: song.my
    })
    await mySong.save();
    res.send(mySong);
  } catch (e) {
    res.status(500);
  }
}

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
