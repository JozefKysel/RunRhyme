import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import './user-data.css';
import { TimePicker } from 'antd';
import moment from 'moment';

function UserData({ getBpmPlaylist }) {

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const pace = Math.round(distance/time * 10) / 10;
  const calcBpm = () => {
    if (pace <= 4) return 171;
    else if (pace <= 5) return 166;
    else if (pace <= 6) return 163;
    else if (pace <= 7) return 160;
    else if (pace <= 8) return 156;
    else if (pace <= 9) return 153;
    else if (pace <= 10) return 150;
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (distance && time) {
      getBpmPlaylist(calcBpm());
      setDistance(0);
      setTime(0);
    }
  };

  const handleDistance = (value) => {
    setDistance(value);
  }

  const handleTime = (value) => {
    setTime(value);
  }

  return (
    <div>
      <form className="forms" onSubmit={handleSubmit}>
        <NumericInput step={0.5} value={time} min={0} onChange={(value) => handleTime(value)}/>
        <NumericInput step={5} value={distance} min={0} onChange={(value) => handleDistance(value)}/>
        <input type="submit" value="Submit"/>
        <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
      </form>
      <div>Pace {pace > 0 && pace} min per km</div>
      <div>Estimated bpm is {calcBpm()}</div>
    </div>)
}

export default UserData;
