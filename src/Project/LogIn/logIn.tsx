/* eslint-disable no-restricted-globals */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../Style/logIn.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosCreate from '../../API/createApi';
import { useContext,useState  } from 'react';
import { SettingContext } from '../Pomodoro/settingContext';
import { ColorContext } from '../Pomodoro/colorContext';

const theme = createTheme();

const SignInSide: React.FC = () => {
  const navigate = useNavigate();
  const freshManTime = useContext(SettingContext);
  const freshManColor = useContext(ColorContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(!event.target.validity.valid);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = new FormData(event.currentTarget);
    if (!post.get('email') || !post.get('password')) {
      alert('You should fill out all the blanks');
      return;
    }
    const logIn = await axiosCreate({
      url: '/API/v1/authen',
      method: 'POST',
      data: {
        username: post.get('email'),
        password: post.get('password'),
      },
    });
   

    if (logIn.errorCode === 0) {
      navigate('/Pomodoro');
      const checkNew = await axiosCreate({
        url: 'API/v1/checkNewUser',
        method: 'GET',
      });
      const time = await axiosCreate({
        url: 'API/v1/readSetting',
        method: 'GET',
      });
      console.log(time);
       const breakTime = time.data.breakTime;
        const studyTime = time.data.studyTime;
        const longBreak = time.data.longBreak;
        const loopCount = time.data.longInterval;
        const bg = time.data.themeColor;
        freshManTime.setBreakTime(breakTime);
        freshManTime.setStudyTime(studyTime);
        freshManTime.setLongBreak(longBreak);
        freshManTime.setLoopCount(loopCount);
        freshManTime.setSecondLeft(studyTime * 60);
        freshManColor.setBackground(bg);
      if (checkNew.checkNewUser === true) {
        
        setTimeout(() => {
          if (confirm('First time log in. Do you want to change the setting?')) {
            freshManTime.handleOpen();
          }
        }, 1000);
      }
    } else {
      alert("This account doesn't exist")
    }

    console.log(logIn);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid className="left" item xs={false} sm={4} md={6} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box className="my-box">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"    //đảm bảo giá trị nhập vào có định dạng email, hiển thị bàn phím phù hợp trên điện thoại di động
                value={email}
                onChange={handleEmailChange}
                inputProps={{
                  pattern: "^\\S+@\\S+\\.com$",
                }}
                error={emailError}
                helperText={emailError ? "Wrong email address format" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to="Create_Account">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
