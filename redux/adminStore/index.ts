import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./events-slice";

const store = configureStore({
  reducer: {
    // Add your slice reducers here
    events: eventsSlice.reducer,
  },
});

export default store;
