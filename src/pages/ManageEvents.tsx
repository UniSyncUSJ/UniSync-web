/* eslint-disable react-refresh/only-export-components */
import React from "react";

import EventCatalogue from "../components/Events/EventCatalogue";

function ManageEventsPage() {
  return (
    <div>
      <h1>Manage Events</h1>
      <ul>
        <EventCatalogue />
      </ul>
    </div>
  );
}

export default ManageEventsPage;
