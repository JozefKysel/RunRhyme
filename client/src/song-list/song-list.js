import React from 'react';
import './song-list.css';
import Song from '../song/song';

function SongList({ playList }) {

  return playList.length > 0 && playList.map(song => 
    <div key={song._id} className="songs">
      <Song song={song}/>
    </div>
  );
}

export default SongList;
