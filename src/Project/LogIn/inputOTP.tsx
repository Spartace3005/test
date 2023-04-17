import * as React from 'react';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '@mui/material/Button';
import '../../Style/inputOtp.scss';

const InputOTP: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const handleChange = (otp: string) => {
    setOtp(otp);
  };
  return (
    <div className="Otp">
      <div className="inputOtp">
        <div className='title'> Your OTP Code</div>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={"input-cell"}
        />
        <div className="time">0:30</div>
        <div className="action">
          <Button>Clear</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default InputOTP;
