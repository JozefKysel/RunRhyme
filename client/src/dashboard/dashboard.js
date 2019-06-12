import React, { useState, useEffect } from 'react';
import './dashboard.less';
import UserData from '../user-data/user-data';
import SongList from '../song-list/song-list';
import { Redirect } from 'react-router';
import { Link }from 'react-router-dom';
import api from '../api-client';
import Player, { playerInfo } from '../player/player';
import UserInfo from '../user-info/user-info';

export const SongsContext = React.createContext(null);

function Dashboard() {

  const [playList, setPlaylist] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    api.getUserData()
      .then(res => res.json())
      .then(res => setUserInfo(res));
  }, [])

  const getBpmPlaylist = (bpm) => {
    api.getPlaylist(bpm)
      .then(res => res.json())
      .then(res => setPlaylist(res));
  }

  const addSong = (pickedSong) => {
    pickedSong.my = !pickedSong.my;
    if (myPlaylist.every(song => song.split(':')[2] !== pickedSong.song_id)) {
      myPlaylist.push(`spotify:track:${pickedSong.song_id}`);
      setMyPlaylist(myPlaylist);
    } else {
      setMyPlaylist(myPlaylist.filter(element => element.split(':')[2] !== pickedSong.song_id));
    }
  }

  const logOut = () => {
    window.localStorage.clear();
    playerInfo.player.disconnect();
  }

  const playDefault = () => {
    playList.length > 0 && api.setPlay(playList.map(song => `spotify:track:${song.song_id}`));
  };

  const playChosen = () => {
    myPlaylist.length > 0 && api.setPlay(myPlaylist);
  };

  return window.localStorage.getItem('accessToken') ?
    (<SongsContext.Provider value={{
      addSong,
      myPlaylist
    }}>
    <div className='container'>
      <Link to='/login'><button className="logout" onClick={logOut}>Log Out</button></Link>
      <div className='upview'>
        {userInfo !== {} && <UserInfo className='userInfo' userInfo={userInfo}/>}
        <UserData className="data" getBpmPlaylist={getBpmPlaylist}/>
      </div>
      <SongList playList={playList}/>
      <div className="buttons">
        <button className="chosen" onClick={playChosen}>Play chosen</button>
        <button className="chosen" onClick={playDefault}>Play default</button>
      </div>
      <Player className="player"/>
    </div>
    </SongsContext.Provider>
  ) : (<Redirect to='login'/>);
}

export default Dashboard;
