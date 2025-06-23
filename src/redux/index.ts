import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./adminStore/events-slice";
import adminSlice from "./adminStore/admin-slice";
import userSlice from "./userStore/user-slice";
import userEventSlice from "./userStore/user-event-slice";
import userCartSlice from "./userStore/user-cart-slice";
import { searchApi } from "../services/searchApi";
import searchSlice from "./userStore/user-search-slice";

const store = configureStore({
  reducer: {
    // Add your slice reducers here
    events: eventsSlice.reducer,
    admin: adminSlice.reducer,
    user: userSlice.reducer,
    userEvent: userEventSlice.reducer,
    userCart: userCartSlice.reducer,
    userSearch: searchSlice.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
