/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./eventsCatalogue.module.scss";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../store/events-slice";

type Event = {
  id: number;
  title: string;
  date: string;
  status: string;
  venue?: string;
};

function EventCatalogue() {
  const events = useSelector(
    (state: { events: { events: Event[] } }) => state.events.events
  );

  const dispatch = useDispatch();

  type EventType = {
    id: number;
    title: string;
    date: string;
    status: string;
    venue?: string;
  };
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditEvent = () => {
    dispatch(
      eventActions.editEvent({
        id: selectedEvent?.id || 0,
        updatedEvent: {
          id: selectedEvent?.id || 0,
          title: selectedEvent?.title || "",
          date: selectedEvent?.date || "",
          status: selectedEvent?.status || "",
          venue: selectedEvent?.venue || "",
        },
      })
    );
  };

  const handleDeleteEvent = () => {
    dispatch(eventActions.removeEvents(selectedEvent?.id || 0));
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
              <button onClick={() => handleEditEvent()}>
                <Edit size={16} />
              </button>
              <button onClick={() => handleDeleteEvent()}>
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
