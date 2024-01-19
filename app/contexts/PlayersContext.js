'use client'

// contexts/PlayersContext.js

import React, { createContext, useState, useEffect } from 'react';

const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null); // State to store the error message

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      setPlayers(data);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error('Error fetching players:', error);
      // Handle error
      setError('Failed to connect to the database. Please try again later.'); // Set a user-friendly error message
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