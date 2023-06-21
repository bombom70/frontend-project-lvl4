import { configureStore } from "@reduxjs/toolkit";
import channelSlices from "./chanelSlices";

export const store = configureStore({
  reducer: {
    channel: channelSlices,
  },
});