// App.tsx

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';
import PlayerList from './API_calls/PlayerList';
import axios from 'axios';

function App() {
  const [playerData, setPlayerData] = useState<Player[]>([]);

  const handlePlayerData = (data: Player[]) => {
    setPlayerData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/players/');
        setPlayerData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<HomePage playerData={playerData} />} />
        <Route path='/auth' element={<AuthPage />} />
        {/* Pass the onPlayerData callback to PlayerList */}
        <Route path='/player-list' element={<PlayerList onPlayerData={handlePlayerData} />} />
      </Routes>
    </PageLayout>
  );
}

export default App;





