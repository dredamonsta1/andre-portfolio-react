import { createContext, useState } from 'react';
// import img from '../src/image/nyc.JPG';
import LandingPageCircle from './components/LandingPageCircle/LandingPageCircle';
import LandingPageContainer from './components/LandigPageContainer/LandingPageContainer';
import LandingPageModal from './components/LandingPageModal/LandingPageModal';
import LandingPageFooter from './components/LandingPageFooter/LandingPageFooter';
// import LandingPageModal

import './App.css';

export const themeContext = createContext("null");

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {/* <div className='app' id={theme}> */}
        <div className="app-background" id={theme}>
          <div className="filter-shade">
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
      {/* </div> */}
    </themeContext.Provider>
  );
}
export default App;
