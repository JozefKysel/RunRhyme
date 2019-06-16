const mongoose = require('mongoose');
const schema = require('./model');

mongoose.connect('mongodb://localhost:27017/bpmPlaylist', {useNewUrlParser: true});

exports.Song = mongoose.model('Song', schema.songSchema);
// exports.MySong = mongoose.model('MySong', schema.mySongSchema);
