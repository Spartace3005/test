import React from 'react';
import axiosCreate from '../../API/createApi';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react'

const ProtectAccount = ({children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const Protect = async () => {
      const logIn = await axiosCreate({
        url: '/API/v1/checkAuth',
        method: 'GET',
      });
      if(logIn.errorCode === 1){
        navigate('/')
      }
      console.log(logIn)
    };
    Protect();
  },[navigate]);
  
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectAccount;
