import axios from 'axios';
import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const initData = createAsyncThunk('data/init', async () => {
  try {
    const responseChannels = await axios.get(
      '/api/v1/channels',
      getAuthHeader()
    );
    const responseMessages = await axios.get(
      '/api/v1/messages',
      getAuthHeader()
    );
    return {
      channels: responseChannels.data.channels,
      messages: responseMessages.data.messages,
      currentChannelId: responseChannels.data.currentChannelId,
    };
  } catch (err) {
    console.error(err.response.data);
  }
});
