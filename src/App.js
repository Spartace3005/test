import './Style/App.scss';
import { Route, Routes } from 'react-router-dom';
import Pomodoro from './Project/Pomodoro/pomodoro';
import SignInSide from './Project/LogIn/logIn';
import Create from './Project/LogIn/createAccount';
import Admin from './Project/ADMIN/admin'
// import ProtectAccount from './Project/LogIn/protectAccount';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route
        path="Pomodoro"
        element={
          // <ProtectAccount >
            <Pomodoro />
          // </ProtectAccount>
        }
      ></Route>
      <Route path="Create_Account" element={<Create />}></Route>
      <Route path="Admin" element={<Admin/>}/>
    </Routes>
  );
};

export default App;
