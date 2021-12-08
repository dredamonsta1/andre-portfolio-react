// import img from '../src/image/nyc.JPG';
import LandingPageCircle from './components/LandingPageCircle/LandingPageCircle';
import LandingPageContainer from './components/LandigPageContainer/LandingPageContainer';
import LandingPageModal from './components/LandingPageModal/LandingPageModal';
import LandingPageFooter from './components/LandingPageFooter/LandingPageFooter';
// import LandingPageModal

import './App.css';

function App() {
  return (
    <div 
      className="app-background">
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
  );
}

export default App;
