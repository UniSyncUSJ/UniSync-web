import { createSlice } from "@reduxjs/toolkit";

type Event = {
  id: number;
  title: string;
  date: string;
  status: string;
  venue?: string;
  image?: string;
};

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialEventState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState: initialEventState,
  reducers: {
    addEvent(state, action: { payload: Event }) {
      const newEvent = action.payload;
      state.events.push({
        id: newEvent.id,
        title: newEvent.title,
        date: newEvent.date,
        status: newEvent.status,
        venue: newEvent.venue,
        image: newEvent.image,
      });
    },
    removeEvents(state, action: { payload: number }) {
      const eventId = action.payload;
      state.events = state.events.filter((event) => event.id !== eventId);
    },
    editEvent(state, action: { payload: { id: number; updatedEvent: Event } }) {
      const { id, updatedEvent } = action.payload;
      const existingEventIndex = state.events.findIndex(
        (event) => event.id === id
      );
      if (existingEventIndex >= 0) {
        state.events[existingEventIndex] = {
          ...state.events[existingEventIndex],
          ...updatedEvent,
        };
      }
    },
  },
});

export const eventActions = eventsSlice.actions;

export default eventsSlice;

export const fetchEvents = async () => {
  const response = await fetch("http://localhost:8080/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  } else {
    const resData = await response.json();
    return resData.events as Event[];
  }
};

export const addEvent = async (event: Event) => {
  const response = await fetch("http://localhost:8080/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error("Failed to add event");
  } else {
    const resData = await response.json();
    return resData as Event;
  }
};
