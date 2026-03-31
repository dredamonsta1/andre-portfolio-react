import { useRef, useCallback } from "react";
import useLocalStorage from "use-local-storage";
import LandingPageCircle from "./components/LandingPageCircle/LandingPageCircle";
import LandingPageContainer from "./components/LandigPageContainer/LandingPageContainer";
import LandingPageModal from "./components/LandingPageModal/LandingPageModal";
import LandingPageFooter from "./components/LandingPageFooter/LandingPageFooter";
import Pdf from "./components/Pdf/Pdf.js";
import PortfolioCanvas from "./components/PortfolioCanvas/PortfolioCanvas.jsx";
import ReactSwitch from "react-switch";
import "./App.css";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const pdfRef = useRef(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleResumeOpen = useCallback(() => {
    pdfRef.current?.openModal();
  }, []);

  return (
    <div className="app" data-theme={theme} id={theme}>
      <PortfolioCanvas theme={theme} onResumeOpen={handleResumeOpen} />

      {/* Resume button fixed top-right — catapult aims at it */}
      <div className="resume-corner">
        <Pdf ref={pdfRef} />
      </div>

      <div className="app-background" id={theme}>
        <div className="small-container">
          <LandingPageCircle />
          <LandingPageContainer />
          <LandingPageModal />
          <div className="bottom-bar">
            <div className="switch">
              <div className="toggle-group">
                <label>{theme === "light" ? "🌑" : "🌝"}</label>
                <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
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
