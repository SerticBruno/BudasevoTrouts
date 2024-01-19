'use client'
// contexts/GamesContext.js

import React, { createContext, useState, useEffect } from 'react';

const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/matches'); // Adjust this URL to your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Handle errors appropriately
    }
  };

  useEffect(() => {
    fetchGames(); // Fetch games when the component mounts
  }, []);

  // Provide a way to refresh the games list from outside components
  const refreshGames = () => {
    fetchGames();
  };

  return (
    <GamesContext.Provider value={{ games, refreshGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContext;
