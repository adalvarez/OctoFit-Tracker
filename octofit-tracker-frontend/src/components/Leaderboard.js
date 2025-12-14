import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setEntries(results);
        console.log('Fetched leaderboard:', results);
        console.log('Endpoint used:', endpoint);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {entries.map((entry, idx) => (
          <li key={entry.id || idx}>{entry.user ? entry.user : 'User'} - {entry.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
