import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayerList, fetchPlayerSeasonStats, fetchPlayerLast5Stats } from './features/dataSlice';
import { RootState, AppDispatch } from './store';
import HomePage from './Pages/HomePage';

import Navbar from './Components/Navbar'; // Adjust the path as necessary

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    players,
    playerSeasonStats,
    playerLast5Stats,
  } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchPlayerList());
    dispatch(fetchPlayerSeasonStats());
    dispatch(fetchPlayerLast5Stats());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage players={players} seasonStats={playerSeasonStats} last5Stats={playerLast5Stats} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
