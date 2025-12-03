import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginRequest = async (credentials) => {
  const response = await axios.post('/api/v1/login', credentials);
  return response.data;
};

export const signupRequest = async (credentials) => {
  const response = await axios.post('/api/v1/signup', credentials);
  return response.data;
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginRequest(credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);