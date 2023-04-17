import React, { useContext } from 'react';
import { SettingContext } from './settingContext';

type TimeProps = {
  secondLeft: number;
  timeLable: string;
};
const Time = ({ secondLeft, timeLable }: TimeProps) => {
  const value = useContext(SettingContext);
  let minutes: any = Math.floor(value.secondLeft / 60);
  if (minutes < 10) minutes = '0' + minutes;

  let seconds: any = value.secondLeft - 60 * minutes;
  if (seconds < 10) seconds = '0' + seconds;
  return (
    <div className="Time">
      <label>{value.timeLable}</label>
      <div className='clock'>
        <div className="number">
          <p>{minutes}</p>
          <small>Minutes</small>
        </div>
        <div className="number">
          <p>:</p>
          </div>
        <div className="number">
          <p>{seconds}</p>
          <small>Seconds</small>
        </div>
      </div>
    </div>
  );
};

export default Time;
