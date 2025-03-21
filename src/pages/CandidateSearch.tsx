import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { Link } from 'react-router-dom';
//import React from 'react';

// CandidateSearch component
// Gets the candidates from github and displays them one at a time
function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

async function getNextCandidate() {
  if (index >= candidates.length) {
    
    return;
  }
  const login = candidates[index].login;
  const candidateData = await searchGithubUser(login);
  setCurrentCandidate(candidateData);
  setIndex(index + 1);
}

useEffect(() => {
    const fetchCandidates = async () => {
      // Get array of candidates
      const data = await searchGithub();
      

      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length === 0) { return; }
    getNextCandidate();
  }, [candidates]);

  const handleSaveCandidate = async () => {
    if (!currentCandidate) { return; }


    setItem();
    getNextCandidate();
  };

  const setItem = () => {
    if (!currentCandidate) { return; }

    setSavedCandidates([...savedCandidates, currentCandidate]);

    const savedCandidatesString = localStorage.getItem('savedCandidates') || '[]';

    let savedCandidatesData: Candidate[] = JSON.parse(savedCandidatesString);
    savedCandidatesData.push(currentCandidate);

    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidatesData));
  }


  const handleSkipCandidate = async () => {
    getNextCandidate();
  };

  if (index === candidates.length) {
    return <p>No more candidates available. Please refresh.</p>;
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
        <p>Name: {currentCandidate.name}</p>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location}</p>
        <p>Email: {currentCandidate.email}</p>
        <p>Company: {currentCandidate.company}</p>
        <p>
          Profile: <a href={currentCandidate.html_url}>{currentCandidate.html_url}</a>
        </p>
        <button type="button" onClick={handleSaveCandidate}>+</button>
        <button type="button" onClick={handleSkipCandidate}>-</button>
      </div>
    </div>
  );
}

export default CandidateSearch;