import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PopularThreats from './components/PopularThreats';
import NVDVulnerabilitySeverity from './components/NVDVulnerabilitySeverity';
import TopVulnerabilitiesList from './components/TopVulnerabilitiesList';
import CyberThreatMap from './components/ThreatMap';

function App() {
  return (
    <div className="bg-slate-800 min-h-screen">
      <Header />
      <div className="px-10 max-w-[1500px] w-full mx-auto">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 w-full">
            <PopularThreats />
            <NVDVulnerabilitySeverity />
          </div>
          <div>
            <CyberThreatMap />
          </div>
          <TopVulnerabilitiesList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;