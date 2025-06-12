import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./events-slice";
import adminSlice from "./admin-slice";

const store = configureStore({
  reducer: {
    // Add your slice reducers here
    events: eventsSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
