import React, { useState } from 'react';
import './player.less';
import api from '../../api-client';
export const playerInfo = {};


function Player () {
  const [songState, setSongState] = useState({
    trackName: 'trackName',
    albumName: 'albumName',
    artistName: 'artistName',
    playing: 'playing'
  });

  const playerCheckInterval = setInterval(() => checkForPlayer(), 1000);

  const checkForPlayer = async () => {
    if (window.Spotify !== null && !playerInfo.player) {
      playerInfo.player = new window.Spotify.Player({
        name: 'this player',
        getOAuthToken: cb => { cb (window.localStorage.getItem('accessToken') )}
      });
      await playerInfo.player.connect();
      clearInterval(playerCheckInterval);
      createEventHandlers();
    }
  }
  const createEventHandlers = () => {
    const device_id = window.localStorage.getItem('_spharmony_device_id')
    const access_token = window.localStorage.getItem('accessToken');
    playerInfo.player.on('player_state_changed', (state) => state && onStateChanged(state));
    playerInfo.player.on('ready', data => api.transferPlayback(device_id, access_token));
  }

  const onStateChanged = (state) => {
    const { current_track: currentTrack } = state.track_window;
    const trackName = currentTrack.name;
    const albumName= currentTrack.album.name;
    const artistName = currentTrack.artists
      .map(artist => artist.name).join(', ');
    const playing = !state.paused;
    setSongState({
      trackName,
      albumName,
      artistName,
      playing
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
      <div className="artist">{songState.artistName} - {songState.trackName}</div>
      <div className="buttons">
        <button className="round-button side" onClick={onPrevClick}>
        <img className="left" src="https://img.icons8.com/material-rounded/24/000000/play.png" alt="prev"/></button>
        <button className="round-button" onClick={onPlayClick}>
        <img className="middle" src={`https://img.icons8.com/material-rounded/48/000000/${songState.playing ? 'pause' : 'play'}.png`} alt="play"/></button>
        <button className="round-button side" onClick={onNextClick}>
        <img className="right" src="https://img.icons8.com/material-rounded/24/000000/play.png" alt="next"/></button>
      </div>
      <div className="volume">
        <i className="material-icons">volume_up</i>
        <input type="range" step={0.1} min={0} max={1} className="slider" onChange={setVolume}/>
      </div>
    </div>
  );
}

export default Player;
