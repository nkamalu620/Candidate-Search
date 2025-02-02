import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { Link } from 'react-router-dom';
//import React from 'react';

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
      setItem();
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

  const setItem = () => {
    let savedCandidatesData: Candidate[] = [];
    const savedCandidatesString = localStorage.getItem('savedCandidates');
    if (savedCandidatesString) {
      savedCandidatesData = JSON.parse(savedCandidatesString);
    }
    if (currentCandidate) {
      savedCandidatesData.push(currentCandidate);
    }
    
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }


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