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
      channels: responseChannels.data,
      messages: responseMessages.data,
      currentChannelId: responseChannels.data.currentChannelId,
    };
  } catch (err) {
    console.error(err.response.data);
  }
});

export const sendChannels = createAsyncThunk(
  'chat/sendChannels',
  async ({ name, removable }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/v1/channels',
        { name, removable },
        getAuthHeader()
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeChannel = createAsyncThunk(
  'chat/removeChannel',
  async ({ id }) => {
    await axios.delete(`/api/v1/channels/${id}`, getAuthHeader());
    return id;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ body, channelId, username }) => {
    await axios.post(
      '/api/v1/messages',
      {
        body,
        channelId,
        username,
      },
      getAuthHeader()
    );
  }
);
