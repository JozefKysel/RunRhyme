import React from 'react';
import './song-list.less';
import Song from '../song/song';

function SongList({ playList }) {

  return (
     <div className="list">
      {playList.length > 0 && playList.map(song => 
        <div key={song._id} className="song">
          <Song song={song}/>
          </div>
      )}
    </div>
  );
}

export default SongList;
