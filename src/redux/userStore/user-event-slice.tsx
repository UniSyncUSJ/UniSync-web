import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserEvent {
  id: number;
  title: string;
  date: string;
  status: string;
  venue: string;
  description?: string;
  delegateCount?: number;
  time?: string;
  imageUrl?: string;
}

interface UserEventState {
  events: UserEvent[];
  loading: boolean;
  error: string | null;
}

const initialUserEventState: UserEventState = {
  events: [],
  loading: false,
  error: null,
};

const userEventSlice = createSlice({
  name: "userEvent",
  initialState: initialUserEventState,
  reducers: {
    setUserEvents(state, action: PayloadAction<UserEvent[]>) {
      state.events = action.payload;
    },
    addUserEvent(state, action: PayloadAction<UserEvent>) {
      state.events.push(action.payload);
      //increase the delegate count of the event if it exists
      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (eventIndex !== -1) {
        state.events[eventIndex].delegateCount = Math.max(
          0,
          (state.events[eventIndex].delegateCount ?? 0) + 1
        );
      }
    },
    removeUserEvent(state, action: PayloadAction<number>) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
      //reduce the delegate count of the event if it exists
      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload
      );
      if (eventIndex !== -1) {
        state.events[eventIndex].delegateCount = Math.max(
          0,
          (state.events[eventIndex].delegateCount ?? 0) - 1
        );
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const userEventActions = userEventSlice.actions;
export default userEventSlice;
