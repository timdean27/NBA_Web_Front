import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayerList, fetchPlayerSeasonStats, fetchPlayerLast5Stats } from './features/dataSlice';
import { RootState, AppDispatch } from './store';
import HomePage from './Pages/HomePage';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    players,
    playerSeasonStats,
    playerLast5Stats,
    loading,
    error,
  } = useSelector((state: RootState) => state.data);

  // Fetch API data when the component mounts
  useEffect(() => {
    dispatch(fetchPlayerList());
    dispatch(fetchPlayerSeasonStats());
    dispatch(fetchPlayerLast5Stats());
  }, [dispatch]);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <HomePage
        players={players}
        seasonStats={playerSeasonStats}
        last5Stats={playerLast5Stats}
      />
    </div>
  );
};

export default App;
