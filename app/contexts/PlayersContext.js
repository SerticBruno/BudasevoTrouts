// File: contexts/PlayersContext.js

import React, { createContext, useState, useEffect } from 'react';

const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlayers = async () => {
    try {
      const playersResponse = await fetch('/api/players');
      const statsResponse = await fetch('/api/player-stats');

      if (!playersResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const playersData = await playersResponse.json();
      const statsData = await statsResponse.json();

      // Combine players data with their stats
      const combinedData = playersData.map(player => {
        const stats = statsData.find(s => s._id === player._id) || {};
        return { ...player, ...stats };
      });

      setPlayers(combinedData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to connect to the database. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <PlayersContext.Provider value={{ players, fetchPlayers, error }}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;
