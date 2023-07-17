// import { createContext, useState } from 'react';
import useLocalStorage from 'use-local-storage';
// import img from '../src/image/nyc.JPG';
import LandingPageCircle from './components/LandingPageCircle/LandingPageCircle';
import LandingPageContainer from './components/LandigPageContainer/LandingPageContainer';
import LandingPageModal from './components/LandingPageModal/LandingPageModal';
import LandingPageFooter from './components/LandingPageFooter/LandingPageFooter';
// import Pdf from './components/Pdf/Pdf';
import ReactSwitch from 'react-switch';

import './App.css';

function App() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
      <div className='app' data-theme={theme} id={theme}>
        <div className="app-background" id={theme}>
        {/*<Pdf >*/}
              <div className='switch'>
                <label>{theme === "light" ? "🌑" : "🌝"}</label>
                <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
              </div>
            <div className="small-container">
              <LandingPageCircle />
              <LandingPageContainer />
              <LandingPageModal />
              <div className="contact-icons" alt="social media icons">
              <LandingPageFooter />
              </div>
            </div>
        </div>
      </div>
  );
}
export default App;
