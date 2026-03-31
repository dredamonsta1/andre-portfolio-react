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
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const pdfRef = useRef(null);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleResumeOpen = useCallback(() => {
    pdfRef.current?.openModal();
  }, []);

  return (
    <div className="app" data-theme={theme} id={theme}>
      <PortfolioCanvas theme={theme} onResumeOpen={handleResumeOpen} />

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
                <label style={{ color: 'var(--qm-text)', fontSize: '1.1rem' }}>
                  {theme === "dark" ? "☀️" : "🌑"}
                </label>
                <ReactSwitch
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                  onColor="#7b2fff"
                  offColor="#0077aa"
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
              </div>
            </div>
          </div>
          <div className="contact-icons">
            <LandingPageFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
