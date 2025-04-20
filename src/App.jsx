import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Nav';
import Articles from './components/Articles/Articles';
import InvestigationWorkspace from './components/InvestigationWorkspace/InvestigationWorkspace';
import TextDetector from './components/Detection/TextDetector';
import './App.css';
import Home from './components/Home/Home'; // Add this import

function AppContent() {
  const location = useLocation();
  const isInvestigationPage = location.pathname === '/investigation';

  return (
    <>
      {!isInvestigationPage && <Navbar />}
      {!isInvestigationPage ? (
        <div className="content">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/detector" element={<TextDetector />} />
            <Route path="/investigation" element={<InvestigationWorkspace />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/investigation" element={<InvestigationWorkspace />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router  basename="/FACTS">
      <AppContent />
    </Router>
  );
}

export default App;
