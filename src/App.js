import img from '../src/image/nyc.JPG';
import LandingPageContainer from './components/LandigPageContainer';
import './App.css';

function App() {
  return (
    <div 
      className="app-background" style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      }}>
      <div className="filter-shade">
        <div className="small-container">
          <LandingPageContainer />
        
        <h1>Hello World</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
