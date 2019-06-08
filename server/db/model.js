const mongoose = require('mongoose');

exports.songSchema = new mongoose.Schema({
  album_artists_href: String,
  album_artists_name: String,
  album_href: String,
  album_cover_url: String,
  album_name: String,
  album_id: String,
  song_name: String,
  duration_ms: Number,
  song_href: String,
  song_id: String,
  bpm: Number
});

exports.mySongSchema = new mongoose.Schema({
  album_artists_href: String,
  album_artists_name: String,
  album_href: String,
  album_cover_url: String,
  album_name: String,
  album_id: String,
  song_name: String,
  duration_ms: Number,
  song_href: String,
  song_id: String,
  bpm: Number,
  my: Boolean
});
