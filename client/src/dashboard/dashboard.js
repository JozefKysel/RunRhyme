import React, { useState, useEffect } from 'react';
import './dashboard.css';
import UserData from '../user-data/user-data';
import SongList from '../song-list/song-list';
import api from '../api-client';

export const SongsContext = React.createContext(null);

function Dashboard() {

  const [playList, setPlaylist] = useState([]);

  useEffect(()=> {
    api.getTrack().then(res => res.json()).then(res => setPlaylist([...res.data.albums.items]))
  }, [])

  return (
    <div>
      <a href="http://localhost:4000/login">Log in</a>
      <UserData/>
      <SongList playList={playList}/>
    </div>
  );
}

export default Dashboard;
