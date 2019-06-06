import React, { useState, useEffect } from 'react';
import './dashboard.css';
import UserData from '../user-data/user-data';
import SongList from '../song-list/song-list';
import api from '../api-client';

export const SongsContext = React.createContext(null);

function Dashboard() {

  const [playList, setPlaylist] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem('accessToken')) {
      api.getTokens()
        .then(res => res.json())
        .then(res => api.refreshTokens(res))
        .then(res => res.json())
        .then(res => window.localStorage.setItem('accessToken', res))
        .catch(e => console.log(e));
    }
  }, [])

  const refreshTokenAndGetPlaylist = () => {
    const access_token = window.localStorage.getItem('accessToken');
    api.getPlaylist(access_token)
      .then(res => res.json())
      .then(res => setPlaylist([...res.data.tracks.items]));
  }

  const logOut = () => {
    window.localStorage.clear();
  }

  return (
    <div>
      <a href="http://localhost:4000/login"><button>Log In</button></a>
      <button onClick={logOut}>Log Out</button>
      <UserData refreshTokenAndGetPlaylist={refreshTokenAndGetPlaylist}/>
      <SongList playList={playList}/>
    </div>
  );
}

export default Dashboard;
