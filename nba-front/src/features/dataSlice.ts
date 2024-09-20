import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://nbadjangoapplication-env.eba-fpdumciw.us-east-2.elasticbeanstalk.com';

// Fetch all players
export const fetchPlayerList = createAsyncThunk('data/fetchPlayerList', async () => {
  const response = await axios.get(`${BASE_URL}/api/players/`);
  return response.data;
});

// Fetch all player season stats
export const fetchPlayerSeasonStats = createAsyncThunk('data/fetchPlayerSeasonStats', async () => {
  const response = await axios.get(`${BASE_URL}/api/players/season/`);
  return response.data;
});

// Fetch last 5 games stats for all players
export const fetchPlayerLast5Stats = createAsyncThunk('data/fetchPlayerLast5Stats', async () => {
  const response = await axios.get(`${BASE_URL}/api/players/last5/`);
  return response.data;
});

interface DataState {
  players: any[];
  playerSeasonStats: any[];
  playerLast5Stats: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  players: [],
  playerSeasonStats: [],
  playerLast5Stats: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Player list
    builder
      .addCase(fetchPlayerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayerList.fulfilled, (state, action) => {
        console.log('Fetched Player List:', action.payload); // Log data here
        state.players = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerList.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch player list';
        state.loading = false;
      })
      // Player season stats
      .addCase(fetchPlayerSeasonStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayerSeasonStats.fulfilled, (state, action) => {
        console.log('Fetched Player Season Stats:', action.payload); // Log data here
        state.playerSeasonStats = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerSeasonStats.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch player season stats';
        state.loading = false;
      })
      // Player last 5 games stats
      .addCase(fetchPlayerLast5Stats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayerLast5Stats.fulfilled, (state, action) => {
        console.log('Fetched Player Last 5 Stats:', action.payload); // Log data here
        state.playerLast5Stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerLast5Stats.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch player last 5 games stats';
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;
