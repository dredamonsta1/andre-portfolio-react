import { createContext, useState } from 'react';
import useLocalStorage from 'use-local-storage';
// import img from '../src/image/nyc.JPG';
import LandingPageCircle from './components/LandingPageCircle/LandingPageCircle';
import LandingPageContainer from './components/LandigPageContainer/LandingPageContainer';
import LandingPageModal from './components/LandingPageModal/LandingPageModal';
import LandingPageFooter from './components/LandingPageFooter/LandingPageFooter';
// import AppButton from './components/button/AppButton';
import ReactSwitch from 'react-switch';
// import LandingPageModal

import './App.css';

// export const themeContext = createContext("null");

function App() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)

    
    // setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  return (
    // <themeContext.Provider value={{ theme, toggleTheme }}>
      <div className='app' data-theme={theme}>
        <div className="app-background" id={theme}>
              <div className='switch'>
                <label>{theme === "light" ? "🌝" : "🌑"}</label>
                <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
              </div>
          {/* <div className="filter-shade"> */}
              {/* <AppButton /> */}
            <div className="small-container">
              <LandingPageCircle />
              <LandingPageContainer />
              <LandingPageModal />
              <div className="contact-icons" alt="social media icons">
              <LandingPageFooter />
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    // </themeContext.Provider>
  );
}
export default App;
