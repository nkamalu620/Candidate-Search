import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { Link } from 'react-router-dom';

function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);
 
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
      if (data.length > 0) {
        const candidateData = await searchGithubUser(data[0].login);
        setCurrentCandidate(candidateData);
      }
    };
    fetchCandidates();
  }, []);

  const handleSaveCandidate = async () => {
    if (currentCandidate) {
      setSavedCandidates([...savedCandidates, currentCandidate]);
      const nextCandidateData = candidates.find(candidate => candidate.login !== currentCandidate.login);
      if (nextCandidateData) {
        const nextCandidate = await searchGithubUser(nextCandidateData.login);
        setCurrentCandidate(nextCandidate);
      } else {
        setCurrentCandidate(null);
        setNoMoreCandidates(true);
      }
    }
  };

  const handleSkipCandidate = async () => {
    if (currentCandidate) {
      const nextCandidateData = candidates.find(candidate => candidate.login !== currentCandidate.login);
      if (nextCandidateData) {
        const nextCandidate = await searchGithubUser(nextCandidateData.login);
        setCurrentCandidate(nextCandidate);
      } else {
        setCurrentCandidate(null);
        setNoMoreCandidates(true);
      }
    }
  };

  if (noMoreCandidates) {
    return <div>No more candidates available.</div>;
  }

  if (!currentCandidate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <Link to="/saved-candidates">View Saved Candidates</Link>
      <div>
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
        </div>
        <p>Octocat</p>
        <p>Location: London, UK</p>
        <p>Email: Octocat@gmail.com</p>
        <p>Company: Github</p>
        <p>Bio: I am an aspiring web developer looking to work with great people.</p>
        <button type="button" onClick={handleSaveCandidate}>+</button>
        <button type="button" onClick={handleSkipCandidate}>-</button>
      </div>
    </div>
  );
}

export default CandidateSearch;