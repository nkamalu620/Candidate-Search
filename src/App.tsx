import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';


function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/saved-candidates" element={<SavedCandidates />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
