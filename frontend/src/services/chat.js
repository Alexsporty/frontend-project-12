import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from '../init';
import { toastSuccess } from '../hooks/toastify';
import { handleAxiosError } from '../utils/handleError';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const initData = createAsyncThunk(
  'data/init',
  async (_, { rejectWithValue }) => {
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
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

export const sendChannels = createAsyncThunk(
  'chat/sendChannels',
  async ({ name, removable }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/v1/channels',
        { name, removable },
        getAuthHeader()
      );
      toastSuccess('success.channelCreated');
      return response.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

export const renameChannel = createAsyncThunk(
  'chat/renameChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/channels/${id}`,
        { name },
        getAuthHeader()
      );
      toastSuccess('success.channelRenamed');
      return response.data.channel ? response.data.channel : response.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

export const removeChannel = createAsyncThunk(
  'chat/removeChannel',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/channels/${id}`, getAuthHeader());
      toastSuccess('success.channelRemoved');
      return id;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err));
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ body, channelId, username }, { rejectWithValue }) => {
    try {
      await axios.post(
        '/api/v1/messages',
        {
          body,
          channelId,
          username,
        },
        getAuthHeader()
      );
    } catch (err) {
      rejectWithValue(handleAxiosError(err));
    }
  }
);
