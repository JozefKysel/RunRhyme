import React from 'react';
import './song-list.css';

function SongList({ playList }) {

  return playList.length > 0 && playList.map(song => 
    <div key={song.track.id} className="song-list">
      <div>{song.track.artists[0].name}</div>
      <div>{song.track.name}</div>
      <img src={song.track.album.images[1].url} alt="album cover"/>
    </div>
  );
}

export default SongList;
