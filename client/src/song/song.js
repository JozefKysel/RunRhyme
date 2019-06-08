import React from 'react';
import './song.css';
import api from '../api-client';

function Song({ song }) {
  const className = 'add';
  return (
    <div className='item'>
      <div>{song.album_artists_name}</div>
      <div>{song.song_name}</div>
      <img src={song.album_cover_url} alt='album cover'/>
      <button className={className} onClick={() => api.setPlay(song.song_id)}></button>
    </div>)
}

export default Song;
