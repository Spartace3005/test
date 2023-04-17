import React, { useContext } from 'react';
import { SettingContext } from './settingContext';
import '../../Style/setting.scss';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ColorModal from './colorModal';
import { ColorContext } from './colorContext';
import axiosCreate from '../../API/createApi';
import Button from '@mui/material/Button';

interface SettingProps {
  handleClose: () => void;
}

const Setting = (props: SettingProps) => {
  const settingValue = useContext(SettingContext);
  const { handleClose } = props;
  const theme = useContext(ColorContext);
  const bg = theme.background;

  const handlePost = async () => {
    const changeSetting = await axiosCreate({
      url: '/API/v1/changeSetting',
      method: 'POST',
      data: {
        studyTime: `${settingValue.studyTime}`,
        breakTime: `${settingValue.breakTime}`,
        longBreak: `${settingValue.longBreak}`,
        longInterval: `${settingValue.loopCount}`,
        themeColor: `${bg}`,
      },
    });
    console.log(
      `studyTime: ${settingValue.studyTime}, breakTime: ${settingValue.breakTime}, longBreak: ${settingValue.longBreak}, longInterval: ${settingValue.loopCount},${bg}`,
    );
    console.log(changeSetting);
  };
  const saveSetting = () => {
    handlePost();
    handleClose();
  };
  return (
    <div className="Setting">
      <div className="title">
        <div>Setting</div>
        <div onClick={handleClose} className="close">
          <CloseIcon />
        </div>
      </div>
      <div className="mini-title">
        <div className="icon">
          <ScheduleIcon />
        </div>
        Timer
      </div>
      <div className="setting-time">
        <div className="title-time">Time(minutes)</div>
        <div className="Line-1">
          <div className="Section">
            <label>Study Time:</label>
            <input
              value={settingValue.studyTime}
              type="number"
              min={0}
              max={45}
              onChange={(event) => {
                settingValue.setSecondLeft(
                  parseInt(event.target.value, 10) * 60,
                );
                settingValue.setStudyTime(parseInt(event.target.value));
              }}
            />
          </div>
          <div className="Section">
            <label>Break Time: </label>
            <input
              value={settingValue.breakTime}
              type="number"
              min={0}
              max={15}
              onChange={(event) =>
                settingValue.setBreakTime(parseInt(event.target.value))
              }
            />
          </div>
          <div className="Section">
            <label>Long Break: </label>
            <input
              value={settingValue.longBreak}
              type="number"
              min={45}
              onChange={(event) => {
                settingValue.setLongBreak(parseInt(event.target.value));
              }}
            />
          </div>
        </div>
        <div className="Line-2">
          <div className="title-time">Long Break interval: </div>
          <input
            value={settingValue.loopCount}
            type="number"
            min={0}
            onChange={(event) => {
              settingValue.setLoopCount(parseInt(event.target.value));
            }}
          />
        </div>
      </div>
      <div className="mini-title">
        <div className="icon">
          <AutoFixHighIcon />
        </div>
        THEME
      </div>
      <div className="setting-theme">
        <div className="title-theme">Color Theme</div>
        <div className={bg}>
          <ColorModal />
        </div>
      </div>
      <Button onClick={saveSetting} className='save'>Save</Button>
    </div>
  );
};

export default Setting;
