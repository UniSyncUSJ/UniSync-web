import React, { useState, useRef } from "react";
import { Edit, Image, Save } from "lucide-react";
import styles from "../admincomp/admin.module.scss";
import Modal from "../../admin/modal/Modal";
import { useSelector } from "react-redux";

function EventAlbum() {
  const eventItems = useSelector(
    (state: {
      events: {
        events: {
          id: number;
          title: string;
          date: string;
          status: string;
          image: string;
        }[];
      };
    }) => state.events.events
  );
  const [events, setEvents] = useState(eventItems);

  type EventType = {
    id: number;
    title: string;
    date: string;
    status: string;
    image: string;
  };

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
    }
    modalRef.current?.close();
    setSelectedEvent(null);
  };

  const handleEditEvent = (event: EventType) => {
    setSelectedEvent(event);
    modalRef.current?.open();
  };

  const handleCancelEdit = () => {
    modalRef.current?.close();
    setSelectedEvent(null);
  };

  return (
    <div className={styles.albumSection}>
      <div className={styles.albumHeader}>
        <h3>Recent Album</h3>
        <button
          className={styles.editBtn}
          onClick={() => handleEditEvent(events[0])}
        >
          <Edit size={16} />
          Edit Button
        </button>
      </div>
      <div className={styles.imageGrid}>
        <div className={styles.imagePlaceholder}>
          {/* loop through events and add appropriate styles */}
        </div>
        <div className={styles.imagePlaceholder}>
          <Image size={40} />
        </div>
      </div>
      <p className={styles.imageNote}>
        Banner images should include a pattern or suitable image | Color
      </p>

      <Modal ref={modalRef}>
        {selectedEvent && (
          <div className={styles.modalContent}>
            <h3>Edit Event</h3>
            <div className={styles.formGroup}>
              <label>Event Title</label>
              <input
                type="text"
                value={selectedEvent.title}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Event Date</label>
              <input
                type="date"
                value={selectedEvent.date}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, date: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                value={selectedEvent.status}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    status: e.target.value,
                  })
                }
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleSaveEvent} className={styles.saveBtn}>
                <Save size={16} />
                Save
              </button>
              <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default EventAlbum;
