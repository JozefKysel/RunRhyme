import React, { useState } from 'react';
import './player.css';
import { PlayerIcon } from 'react-player-controls';
import api from '../api-client';
export const playerInfo = {};

function Player () {

  const [device_id, setDeviceID] = useState('');
  const playerCheckInterval = setInterval(() => checkForPlayer(), 1000);
  const checkForPlayer = () => {
    if (window.Spotify !== null) {
      playerInfo.player = new window.Spotify.Player({
        name: 'this player',
        getOAuthToken: cb => { cb (window.localStorage.getItem('accessToken') )}
      });
      playerInfo.player.connect().then(success => success ? console.log('player connected') : console.log('not connected'));
      clearInterval(playerCheckInterval);
      createEventHandlers();
    }
  }
  const createEventHandlers = () => {
    playerInfo.player.on('player_state_changed', state => { console.log(state); });

    // Ready
    playerInfo.player.on('ready', async data => {
      let { device_id } = data;
      await setDeviceID(device_id);
      api.transferPlayback(device_id, window.localStorage.getItem('accessToken'))
    });
  }

  const onPrevClick = () => {
    playerInfo.player.previousTrack();
  }

  const onPlayClick = () => {
    playerInfo.player.togglePlay();
  }

  const onNextClick = () => {
    playerInfo.player.nextTrack();
  }

  const setVolume = (e) => {
    playerInfo.player.setVolume(e.target.value);
  }

  return (
    <div className="player">
      <PlayerIcon.Previous onClick={onPrevClick}/>
      <PlayerIcon.Play onClick={onPlayClick}/>
      <PlayerIcon.Next onClick={onNextClick}/>
      <input type="range" max={1} min={0} step={0.01} onChange={setVolume}></input>
      <button>play this playlist</button>
    </div>
  )
}

export default Player;
