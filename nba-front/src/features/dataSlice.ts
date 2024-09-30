import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// createSlice: A function from Redux Toolkit that simplifies the creation of Redux "slices", which include the initial state, reducers, and actions.
// createAsyncThunk: A function that helps handle async actions (like API requests) and automatically manages states (pending, fulfilled, rejected).

import axios from 'axios'; 
// axios: A popular library used for making HTTP requests.

const BASE_URL = 'http://nbadjangoapplication-env.eba-fpdumciw.us-east-2.elasticbeanstalk.com';
// BASE_URL: The base URL for the Django backend server where the NBA player-related APIs are hosted.


// Fetch all players
export const fetchPlayerList = createAsyncThunk('data/fetchPlayerList', async () => {
  const response = await axios.get(`${BASE_URL}/api/players/`);
  return response.data;
});
// fetchPlayerList: Creates an async thunk to fetch the player list from the backend.
// 'data/fetchPlayerList': A unique identifier for this action.
// axios.get(`${BASE_URL}/api/players/`): Makes a GET request to fetch player data.
// response.data: The returned data is automatically handled by Redux Toolkit when the request is successful.


// Fetch all player season stats
export const fetchPlayerSeasonStats = createAsyncThunk('data/fetchPlayerSeasonStats', async () => {
  const response = await axios.get(`${BASE_URL}/api/players/season/`);
  return response.data;
});
// fetchPlayerSeasonStats: Similar to the previous thunk, but it fetches player season statistics from a different API endpoint.


// Fetch last 5 games stats for all players
export const fetchPlayerLast5Stats = createAsyncThunk('data/fetchPlayerLast5Stats', async () => {
  const response = await axios.get(`${BASE_URL}/api/players/last5/`);
  return response.data;
});
// fetchPlayerLast5Stats: Creates a thunk to fetch the last 5 games' stats for all players.


interface DataState {
  players: any[];                // An array to store the list of players fetched.
  playerSeasonStats: any[];      // An array to store player season stats.
  playerLast5Stats: any[];       // An array to store the last 5 games' stats for players.
  loading: boolean;              // A boolean to indicate if a request is in progress.
  error: string | null;          // Stores any error messages encountered during the requests.
}

const initialState: DataState = {
  players: [],                    // Initially, the player list is empty.
  playerSeasonStats: [],           // Initially, the player season stats list is empty.
  playerLast5Stats: [],            // Initially, the last 5 games stats list is empty.
  loading: false,                  // No loading in progress at the start.
  error: null,                     // No errors at the start.
};
// initialState: Defines the default structure of the Redux slice's state.


// Creating the Redux slice
const dataSlice = createSlice({
  name: 'data',  // The name of this slice of the state.
  initialState,  // The initial state as defined above.
  reducers: {},  // No synchronous reducers are defined here.
  extraReducers: (builder) => { // Handles the asynchronous actions (thunks).
    
    // Handling the Player List Fetch
    // The .addCase method in Redux Toolkit is used to handle specific action types in your reducer. 
    // When you're working with asynchronous actions created using createAsyncThunk, 
    // each thunk generates three action types automatically: pending, fulfilled, and rejected.
    // The .addCase method allows you to define what should happen in response to these specific actions.
    builder
    // Handle pending state when fetching player list
    .addCase(fetchPlayerList.pending, (state) => {
      state.loading = true;  // Set loading to true while waiting for the data
    })
    // Handle the success state when the player list is fetched
    .addCase(fetchPlayerList.fulfilled, (state, action) => {
      state.players = action.payload;  // Update the state with fetched player data
      state.loading = false;  // Set loading to false, as the request has completed
    })
    // Handle the error state if fetching player list fails
    .addCase(fetchPlayerList.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch player list';  // Capture the error message
      state.loading = false;  // Set loading to false, as the request has failed
    })
      
      // Handling Player Season Stats Fetch
      .addCase(fetchPlayerSeasonStats.pending, (state) => {
        state.loading = true;  // When the request is in progress, set loading to true.
      })
      .addCase(fetchPlayerSeasonStats.fulfilled, (state, action) => {
        console.log('Fetched Player Season Stats:', action.payload); // Log the fetched season stats.
        state.playerSeasonStats = action.payload;  // Store the fetched season stats in the state.
        state.loading = false;  // Set loading to false as the request succeeded.
      })
      .addCase(fetchPlayerSeasonStats.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch player season stats';  // Store error message.
        state.loading = false;  // Set loading to false as the request failed.
      })
      
      // Handling Player Last 5 Games Stats Fetch
      .addCase(fetchPlayerLast5Stats.pending, (state) => {
        state.loading = true;  // When the request is in progress, set loading to true.
      })
      .addCase(fetchPlayerLast5Stats.fulfilled, (state, action) => {
        console.log('Fetched Player Last 5 Stats:', action.payload); // Log the last 5 games stats.
        state.playerLast5Stats = action.payload;  // Store the last 5 games' stats in the state.
        state.loading = false;  // Set loading to false as the request succeeded.
      })
      .addCase(fetchPlayerLast5Stats.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch player last 5 games stats';  // Store error message.
        state.loading = false;  // Set loading to false as the request failed.
      });
  },
});
// dataSlice: Defines the "data" slice which contains the player data and handles the async actions for fetching the data.

export default dataSlice.reducer;
// Exports the reducer function that handles state updates for this slice.
