import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import './user-data.less';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

function UserData({ getBpmPlaylist }) {

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const pace = Math.round((time/distance) * 10) / 10;

  // this should be linear function
  // needs to be refactored after reorganization of data in db 
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

  const handleTime = (time, timeString) => {
    const thisTime = timeString.split(':');
    const timeInMinutes = ((+thisTime[0]) * 60) + (+thisTime[1]);
    setTime(timeInMinutes);
  }

  return (
    <div className='userData'>
      <form className="forms" onSubmit={handleSubmit}>
        <TimePicker className="input" defaultOpenValue={moment('HH:mm:ss')} onChange={(time, timeString) => handleTime(time, timeString)} size="large"/>
        <div>
          <NumericInput className="distance" step={0.5} value={distance} min={0} onChange={(value) => handleDistance(value)}/>
        </div>
        <input className="submit" type="submit" value="Generate playlist"/>
      </form>
      <div>{!pace ? 0 : pace} min/km
        <img src="https://img.icons8.com/color/48/000000/track-and-field.png" alt="runner"/>
      </div>
    </div>
  );
}

export default UserData;
