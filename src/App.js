// import { createContext, useState } from 'react';
import useLocalStorage from "use-local-storage";
// import img from '../src/image/nyc.JPG';
import LandingPageCircle from "./components/LandingPageCircle/LandingPageCircle";
import LandingPageContainer from "./components/LandigPageContainer/LandingPageContainer";
import LandingPageModal from "./components/LandingPageModal/LandingPageModal";
import LandingPageFooter from "./components/LandingPageFooter/LandingPageFooter";

import Pdf from "./components/Pdf/Pdf.js";

import ReactSwitch from "react-switch";

import "./App.css";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="app" data-theme={theme} id={theme}>
      <div className="app-background" id={theme}>
        <div className="small-container">
          <LandingPageCircle />
          <LandingPageContainer />
          <LandingPageModal />
          {/* <div className="switch">
            <Pdf />
            <label>{theme === "light" ? "🌑" : "🌝"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div> */}
          <div className="bottom-bar">
            <div className="switch">
              <Pdf />
              <div className="toggle-group">
                <label>{theme === "light" ? "🌑" : "🌝"}</label>
                <ReactSwitch
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
              </div>
            </div>
          </div>
          <div className="contact-icons" alt="social media icons">
            <LandingPageFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

// *****************New Code************************

// import useLocalStorage from "use-local-storage";
// import LandingPageCircle from "./components/LandingPageCircle/LandingPageCircle";
// import LandingPageContainer from "./components/LandigPageContainer/LandingPageContainer";
// import LandingPageModal from "./components/LandingPageModal/LandingPageModal";
// import LandingPageFooter from "./components/LandingPageFooter/LandingPageFooter";
// import Pdf from "./components/Pdf/Pdf.js";
// import ReactSwitch from "react-switch";
// import "./App.css";

// function App() {
//   // FIX: Proper initialization of local storage theme
//   const [theme, setTheme] = useLocalStorage("theme", "light");

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     /* We use data-theme for CSS variables and id for specific background overrides */
//     <div className="app" data-theme={theme}>
//       <div className="app-background">
//         {/* Top Control Bar: Resume and Dark Mode Toggle */}
//         <div className="top-controls">
//           <div className="resume-wrapper">
//             <Pdf />
//           </div>
//           <div className="switch-wrapper">
//             <label className="theme-emoji">
//               {theme === "light" ? "🌑" : "🌝"}
//             </label>
//             <ReactSwitch
//               onChange={toggleTheme}
//               checked={theme === "dark"}
//               uncheckedIcon={false}
//               checkedIcon={false}
//               onColor="#46045e"
//             />
//           </div>
//         </div>

//         <div className="small-container">
//           <LandingPageCircle />
//           <LandingPageContainer />
//           <LandingPageModal />
//           <div className="contact-icons">
//             <LandingPageFooter />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
