import { createSlice } from '@reduxjs/toolkit';
import { initData, removeChannel } from '../../services/chat';

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
      state.messages.push(action.payload);
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(initData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload.channels;
        state.messages = action.payload.messages;
        state.currentChannelId = action.payload.currentChannelId;
      })
      .addCase(initData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter(
          (ch) => ch.id !== action.payload
        );
      });
  },
});
export const { addMessage, addChannel, setCurrentChannel } = chatSlice.actions;
export default chatSlice.reducer;
