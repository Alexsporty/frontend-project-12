import { createSlice } from '@reduxjs/toolkit'
import {
  initData,
  removeChannel,
  renameChannel,
  sendChannels,
} from '../../services/chat'
import { toast } from 'react-toastify'
import i18n from '../../init'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
    addChannel(state, action) {
      state.channels.push(action.payload)
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload
    },
    renameChannelSuccess(state, action) {
      const { id, name } = action.payload
      const channel = state.channels.find(c => c.id === id)
      if (channel) channel.name = name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(initData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.channels = action.payload.channels
        state.messages = action.payload.messages
        state.currentChannelId = action.payload.currentChannelId
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter(ch => ch.id !== action.payload)
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        const updatedChannel = action.payload
        state.channels = state.channels.map(c =>
          c.id === updatedChannel.id ? { ...c, name: updatedChannel.name } : c,
        )
      })
      .addCase(initData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        toast.error(i18n.t(action.payload))
      })
      .addCase(sendChannels.rejected, (state, action) => {
        state.error = action.payload
        toast.error(i18n.t(action.payload))
      })

      .addCase(renameChannel.rejected, (state, action) => {
        state.error = action.payload
        toast.error(i18n.t(action.payload))
      })

      .addCase(removeChannel.rejected, (state, action) => {
        state.error = action.payload
        toast.error(i18n.t(action.payload))
      })
  },
})
export const {
  addMessage,
  addChannel,
  setCurrentChannel,
  renameChannelSuccess,
} = chatSlice.actions
export default chatSlice.reducer
