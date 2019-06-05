import React, { useState } from 'react';
import './song-list.css';

function SongList({ playList }) {

  return playList.length > 0 && playList.map(song => 
    <div key={song.id}>
      <img src={song.images[1].url}/>
    </div>

  );
}

export default SongList;
