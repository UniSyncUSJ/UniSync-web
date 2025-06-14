import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./adminStore/events-slice";
import adminSlice from "./adminStore/admin-slice";
import userSlice from "./userStore/user-slice";
import userEventSlice from "./userStore/user-event-slice";

const store = configureStore({
  reducer: {
    // Add your slice reducers here
    events: eventsSlice.reducer,
    admin: adminSlice.reducer,
    user: userSlice.reducer,
    userEvent: userEventSlice.reducer,
  },
});

export default store;
