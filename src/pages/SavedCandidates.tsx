import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidatesData = localStorage.getItem('savedCandidates');
    if (savedCandidatesData) {
      setSavedCandidates(JSON.parse(savedCandidatesData));
    }
  }, []);
  
  return (
    <>
      <h1>Potential Candidates</h1>
      <div>
        {savedCandidates.length > 0 ? (
          savedCandidates.map(candidate => (
            <div key={candidate.username}>
              <img src={candidate.avatar_url} alt={candidate.name} />
              <p>Name: {candidate.name}</p>
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <p>
                Profile: <a href={candidate.html_url}>{candidate.html_url}</a>
              </p>
            </div>
          ))
        ) : (
          <p>No saved candidates available.</p>
        )}
      </div>
    </>
  );
};

export default SavedCandidates;

