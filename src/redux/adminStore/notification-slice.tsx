import { createSlice } from "@reduxjs/toolkit";

type Notification = {
  id: number;
  message: string;
  time: string;
};

const initialNotificationState = {
  notifications: [] as Notification[],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initialNotificationState,
  reducers: {
    addNotification(state, action: { payload: { message: string } }) {
      const newNotification = action.payload;
      state.notifications.push({
        id: new Date().getTime(), // Unique ID based on timestamp
        message: newNotification.message,
        time: new Date().toLocaleTimeString(),
      });
    },
  },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const fetchNNotifications = async () => {
  const response = await fetch("http://localhost:8080/api/notifications");
  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  const data = await response.json();
  return data.notifications as Notification[];
};

export const addNotificationToServer = async (message: string) => {
  const response = await fetch("http://localhost:8080/api/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to add notification");
  }
  const data = await response.json();
  return data.notification as Notification;
};
