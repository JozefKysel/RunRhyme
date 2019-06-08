import React, { useState, useEffect } from 'react';
import './dashboard.css';
import UserData from '../user-data/user-data';
import SongList from '../song-list/song-list';
import { Redirect } from 'react-router';
import { Link }from 'react-router-dom';
import api from '../api-client';
import Player from '../player/player';
import { playerInfo } from '../player/player';
import UserInfo from '../user-info/user-info';

export const SongsContext = React.createContext(null);

function Dashboard() {

  const [playList, setPlaylist] = useState([]);
  // const [myPlaylist, setMyPlaylist] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    api.getUserData()
      .then(res => res.json())
      .then(res => setUserInfo(res))
  }, [])

  const getBpmPlaylist = (bpm) => {
    api.getPlaylist(bpm)
      .then(res => res.json())
      .then(res => setPlaylist(res))
      .catch(e => console.log(e));
  }

  // const toggleSong = (song) => {
  //   let list = [...myPlaylist];
  //   if (!song.my ) {
  //     song.my = !song.my;
  //     api.saveSong(song);
  //     list.push(song);
  //   } else {
  //     list = list.filter(element => element._id !== song._id);
  //     song.my = !song.my;
  //     api.deleteSong(song);
  //   }
  //   setMyPlaylist(list);
  // }

  const logOut = () => {
    window.localStorage.clear();
    playerInfo.player.togglePlay();
    playerInfo.player.disconnect();
  }

  return window.localStorage.getItem('accessToken') ?
    (<SongsContext.Provider value={{
    }}>
    <div className='container'>
      <Link to='/login'><button onClick={logOut}>Log Out</button></Link>
      <div className='userInfo'>
        {userInfo.images && <UserInfo userInfo={userInfo}/>}
      </div>
      <div className="data">
        <UserData getBpmPlaylist={getBpmPlaylist}/>
      </div>
      <div className="list">
        <SongList playList={playList}/>
      </div>
      <Player/>
    </div>
    </SongsContext.Provider>
  )
  : (<Redirect to='login'/>)
}

export default Dashboard;
