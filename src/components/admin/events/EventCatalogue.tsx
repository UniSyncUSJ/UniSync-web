/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styles from "./eventsCatalogue.module.scss"; // Updated import path
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

type Event = {
  id: number;
  title: string;
  date: string;
  status: string;
  venue?: string;
  image?: string;
};

function EventCatalogue() {
  const events = useSelector(
    (state: { events: { events: Event[] } }) => state.events.events
  );

  const dispatch = useDispatch();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const editModalRef = useRef<{ open: () => void; close: () => void }>(null);

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    editModalRef.current?.open();
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    deleteModalRef.current?.open();
  };

  useEffect(() => {}, [events]);

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
        {events.map((event) => (
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
              <button onClick={() => handleDeleteEvent(event)}>
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
