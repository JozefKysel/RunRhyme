import { SongsContext } from '../dashboard';
import React, { useState, useContext } from 'react';
import './song.less';

function Song({ song }) {
  const [className, setClass] = useState('add');
  const { addToMyPlaylist } = useContext(SongsContext);

  return (
    <div className='item'>
      <div className="cover">
        <img src={song.album_cover_url} alt='album cover'/>
        <p className="info">
        <span>{song.album_artists_name}</span><span>{song.song_name}</span>
        </p>
      </div>
      <button className={className} onClick={() => {
        setClass(song.my ? 'add' : 'delete');
        addToMyPlaylist(song);
      }}></button>
    </div>
  );
}

export default Song;
