import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import api from '../api-client';
import './user-data.css';

function UserData() {

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [pace, setPace] = useState(0);
  const [bpm, setBpm] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (distance && time){
      resetStates();
      setPaceAndBpm();
    }
  };

  const resetStates = () => {
    setDistance(0);
    setTime(0);
  }

  const setPaceAndBpm = () => {
    setPace(Math.round(distance/time * 10) / 10);
    setBpm(171);
  }

  const handleDistance = (value) => {
    setDistance(value);
  }

  const handleTime = (value) => {
    setTime(value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        run distance: <NumericInput step={0.5} value={time} min={0} onChange={(value) => handleTime(value)}/>km
        run duration: <NumericInput step={5} value={distance} min={0} onChange={(value) => handleDistance(value)}/>min
        <input type="submit" value="Submit"/>
      </form>
      <div>Pace {pace} min per km</div>
      <div>Estimated bpm is {bpm}</div>
    </div>
  );
}

export default UserData;
