import React, { useState, useEffect } from 'react';
import { UserData, SongList, Player, UserInfo } from '..';
import { Link }from 'react-router-dom';
import { playerInfo } from '../player';
import api from '../../api-client';
import './dashboard.less';

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

  const addToMyPlaylist = pickedSong => {
    pickedSong.my = !pickedSong.my;
    !myPlaylist.some(song => song === pickedSong.song_id)
      ? setMyPlaylist(myPlaylist => [...myPlaylist, pickedSong.song_id])
      : setMyPlaylist(myPlaylist.filter(song => song !== pickedSong.song_id));
  }

  const logOut = () => {
    window.localStorage.clear();
    playerInfo.player.disconnect();
  }

  const playDefault = () => {
    playList.length > 0 && api.setPlay(playList.map(song => song.song_id));
  };

  const playChosen = () => {
    myPlaylist.length > 0 && api.setPlay(myPlaylist);
  };

  return (
    <SongsContext.Provider value={{
      addToMyPlaylist,
      myPlaylist
    }}>
    <div className='content'>
      <div className='navbar'>
        {userInfo !== {} && <UserInfo className='userInfo' userInfo={userInfo}/>}
        <Link to='/login'><button className="logout" onClick={logOut}>Log Out</button></Link>
      </div>
      <div className='container'>
        <div className='upview'>
          <UserData className="data" getBpmPlaylist={getBpmPlaylist}/>
        </div>
        <SongList playList={playList}/>
        <div className="buttons">
          <button className="chosen" onClick={playChosen}>Play chosen</button>
          <button className="chosen" onClick={playDefault}>Play default</button>
        </div>
        <Player className="player"/>
      </div>
    </div>
    </SongsContext.Provider>
  );
}

export default Dashboard;
