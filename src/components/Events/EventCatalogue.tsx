/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import styles from "./eventsCatalogue.module.scss";
import { Edit, Trash2 } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  status: string;
};

function EventCatalogue() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "2025-07-15",
      status: "Published",
    },
    { id: 2, title: "Workshop Series", date: "2025-08-20", status: "Draft" },
    { id: 3, title: "Annual Meetup", date: "2025-09-10", status: "Published" },
  ]);

  type EventType = { id: number; title: string; date: string; status: string };
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditEvent = (event: {
    id: number;
    title: string;
    date: string;
    status: string;
  }) => {
    setSelectedEvent(event);
    setIsEditing(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className={styles.eventSection}>
      <div className={styles.eventHeader}>
        <h3>Event Catalogue</h3>
        <div className={styles.eventActions}>
          <span>
            Can't edit from here. Admin should navigate to the "Manage Events"
            page
          </span>
        </div>
      </div>
      <div className={styles.eventGrid}>
        {events.map((event: Event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventInfo}>
              <h4>{event.title}</h4>
              <p>{event.date}</p>
              <span
                className={`${styles.status} ${
                  styles[event.status.toLowerCase()]
                }`}
              >
                {event.status}
              </span>
            </div>
            <div className={styles.eventCardActions}>
              <button onClick={() => handleEditEvent(event)}>
                <Edit size={16} />
              </button>
              <button onClick={() => handleDeleteEvent(event.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCatalogue;
