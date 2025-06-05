/* eslint-disable react-refresh/only-export-components */
import React from "react";

function ManageEventsPage() {
  return (
    <div>
      <h1>Manage Events</h1>
    </div>
  );
}

export default ManageEventsPage;

async function fetchEvents() {
  const response = await fetch("http://localhost:8080/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return fetchEvents();
}
