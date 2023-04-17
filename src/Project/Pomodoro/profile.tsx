/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import '../../Style/profile.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosCreate from '../../API/createApi';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [profile, setProfile] = React.useState<boolean>(false);
  const profileOpen = () => {
    setProfile(true);
    yourId();
  };
  const profileClose = () => {
    setProfile(false);
    handleClose();
  };
  const navigate = useNavigate();

  const logOut = async () => {
    const out = await axiosCreate({
      url: '/API/v1/logout',
      method: 'GET',
    });
    if (out.errorCode === 0) {
      navigate('/');
    }
    console.log(out);
  };
  const yourId = async () => {
    const Id = await axiosCreate({
      url: '/API/v1/users',
      method: 'GET',
    });
    setFirstName(Id.data.firstName);
    setLastName(Id.data.lastName);
    setEmail(Id.data.username);
    console.log(Id);
  };
  useEffect(() => {
    yourId();
  }, []);
  const deleteAccount = async () => {
    const deleteId = await axiosCreate({
      url: 'api/v1/deleteUser',
      method: 'DELETE',
    });
    console.log(deleteId)
  }
  const handleDelete = (() => {
    if(confirm('Do you want to delete your account?')){
      deleteAccount();
      navigate('/');
    }

  })
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton className={`outSide`} onClick={handleClick} size="small">
            <Avatar className="avatar">{firstName.charAt(0)} HT</Avatar>
            <div className="outSideTitle">Account</div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        className="menu"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 24,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={profileOpen}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={logOut} component={NavLink} to="/">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>

        <Modal open={profile} onClose={profileClose}>
          <Box className="profile">
            <div className="title">Profile</div>
            <div className="your_account">
              <Avatar className="icon">{firstName.charAt(0)} </Avatar>
              <div className="infor">
                <div className="line-1">
                  <div>Name:</div>
                  <div>Email:</div>
                </div>
                <div className="line-2">
                  <div>
                    {firstName} {lastName}{' '}
                  </div>
                  <div>{email}</div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </Menu>
    </React.Fragment>
  );
}
