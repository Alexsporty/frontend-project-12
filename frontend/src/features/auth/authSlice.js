import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../services/auth.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded' 
        state.username = action.payload.username
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed' 
        state.error = action.error.message
      });
  },
});

export default authSlice.reducer