import React from 'react';
import { useContext, useEffect } from 'react';
import { SettingContext } from './settingContext';
import { ColorContext } from './colorContext';
import '../../Style/pomodoro.scss';
import Time from './time';
import Setting from './setting';
import Profile from './profile';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsStopFill,
  BsFillSkipForwardFill,
} from 'react-icons/bs';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Pomodoro: React.FC = () => {
  const settingValue = useContext(SettingContext);
  const running = settingValue.running;
  const breakTime = settingValue.breakTime;
  const studyTime = settingValue.studyTime;
  const secondLeft = settingValue.secondLeft;
  const timeLable = settingValue.timeLable;
  const loopCount = settingValue.loopCount;
  const longBreak = settingValue.longBreak;

  const colorValue = useContext(ColorContext);
  const bgColor = colorValue.background;

  const open = settingValue.open;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        if (secondLeft === 0) {
          if (timeLable === 'Study') {
            settingValue.setTimeLable('Break');
            settingValue.setSecondLeft(breakTime * 60);
          } else if (timeLable === 'Break') {
            settingValue.setTimeLable('Study');
            settingValue.setSecondLeft(studyTime * 60);
            settingValue.setLoopCount(loopCount - 1);
            if (loopCount === 1) {
              settingValue.setSecondLeft(longBreak * 60);
              settingValue.setTimeLable('Long Break');
            }
          } else if (timeLable === 'Long Break') {
            settingValue.setLoopCount(loopCount);
            settingValue.setTimeLable('Study');
            settingValue.setSecondLeft(studyTime * 60);
          }
        } else {
          settingValue.setSecondLeft(secondLeft - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [
    running,
    secondLeft,
    timeLable,
    studyTime,
    breakTime,
    settingValue,
    loopCount,
    longBreak,
  ]);

  return (
    <div className={`${bgColor} pomodoro-clock`}>
      <div className="nav">
        <Button onClick={settingValue.handleOpen} className="word">
          <SettingsIcon className="settingIcon" />
          <div className="settingTitle">Setting</div>
        </Button>
        <Profile />
        <Modal open={open} onClose={settingValue.handleClose}>
          <Box>
            <Setting handleClose={settingValue.handleClose} />
          </Box>
        </Modal>
      </div>
      <br />
      <div className="header">
        <h1 className="title">Pomodoro Clock</h1>
      </div>
      <div>
        <Time secondLeft={secondLeft} timeLable={timeLable} />
      </div>
      <div className="Control">
        {!running ? (
          <button
            className="btn btn-accept btn-lg"
            onClick={settingValue.startPauseCount}
          >
            <BsFillPlayFill />
          </button>
        ) : (
          <button
            className="btn btn-warning btn-lg"
            onClick={settingValue.startPauseCount}
          >
            <BsPauseFill />
          </button>
        )}
        {
          <button
            className="btn btn-danger btn-lg"
            onClick={settingValue.stopCount}
          >
            <BsStopFill />
          </button>
        }
        {
          <button className="btn btn-accept btn-lg" onClick={settingValue.skip}>
            <BsFillSkipForwardFill />
          </button>
        }
      </div>
    </div>
  );
};

export default Pomodoro;
