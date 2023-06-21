import { createSlice } from "@reduxjs/toolkit";

export const channelSlices = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels = payload.channels;
    }
  }
});

export const { addChannel } = channelSlices.actions

export default channelSlices.reducer