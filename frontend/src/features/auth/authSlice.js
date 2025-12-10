import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser } from '../../services/auth.js';
import { toast } from 'react-toastify';
import i18n from '../../init';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
