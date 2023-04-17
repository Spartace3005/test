import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { SettingProvider } from './Project/Pomodoro/settingContext';
import { BrowserRouter } from 'react-router-dom';
import { ColorProvider } from './Project/Pomodoro/colorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SettingProvider>
    <ColorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ColorProvider>
  </SettingProvider>,
);

// reportWebVitals();
