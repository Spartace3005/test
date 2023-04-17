import React from 'react';
import '../../Style/colorModal.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useContext } from 'react';
import { ColorContext } from './colorContext';

const ColorModal = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const colorValue = useContext(ColorContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const changeBackground1 = () => {
    handleClose();
    colorValue.color1();
  }
  const changeBackground2 = () => {
    handleClose();
    colorValue.color2();
  }
  const changeBackground3 = () => {
    handleClose();
    colorValue.color3();
  }
  const changeBackground4 = () => {
    handleClose();
    colorValue.color4();
  }
  const changeBackground5 = () => {
    handleClose();
    colorValue.color5();
  }
  const changeBackground6 = () => {
    handleClose();
    colorValue.color6();
  }
  const changeBackground7 = () => {
    handleClose();
    colorValue.color7();
  }
  const changeBackground8 = () => {
    handleClose();
    colorValue.color8();
  }
  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <div className="color-modal">
            <div className="title">Pick a color for Pomodoro</div>
            <div className="content">
              <div className="line-1">
                <Button onClick={changeBackground1} className="color-1" ><DoneOutlineIcon  className='icon'/> </Button>
                <Button onClick={changeBackground2} className="color-2" />
                <Button onClick={changeBackground3} className="color-3" />
                <Button onClick={changeBackground4} className="color-4" />
              </div>
              <div className="line-2">
                <Button onClick={changeBackground5} className="color-5" />
                <Button onClick={changeBackground6} className="color-6" />
                <Button onClick={changeBackground7} className="color-7" />
                <Button onClick={changeBackground8} className="color-8" />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ColorModal;
