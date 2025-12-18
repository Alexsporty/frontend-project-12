import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastSuccess } from '../hooks/toastify'
import { handleAxiosError } from '../utils/handleError'
import api from '../utils/axiosInstance'

export const initData = createAsyncThunk(
  'data/init',
  async (_, { rejectWithValue }) => {
    try {
      const responseChannels = await api.get('/api/v1/channels')
      const responseMessages = await api.get('/api/v1/messages')

      return {
        channels: responseChannels.data,
        messages: responseMessages.data,
        currentChannelId: responseChannels.data.currentChannelId,
      }
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)

export const sendChannels = createAsyncThunk(
  'chat/sendChannels',
  async ({ name, removable }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/v1/channels', { name, removable })
      toastSuccess('success.channelCreated')
      return response.data
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)

export const renameChannel = createAsyncThunk(
  'chat/renameChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/v1/channels/${id}`, { name })
      toastSuccess('success.channelRenamed')
      return response.data.channel ? response.data.channel : response.data
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)

export const removeChannel = createAsyncThunk(
  'chat/removeChannel',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/channels/${id}`)
      toastSuccess('success.channelRemoved')
      return id
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ body, channelId, username }, { rejectWithValue }) => {
    try {
      await api.post('/api/v1/messages', {
        body,
        channelId,
        username,
      })
    } catch (err) {
      return rejectWithValue(handleAxiosError(err))
    }
  },
)
