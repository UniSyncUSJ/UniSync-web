import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./userEvents.module.scss";
import Modal from "../../common/modal/Modal";
import { userEventActions } from "../../../../redux/userStore/user-event-slice";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  delegateCount: number;
  imageUrl: string;
  description: string;
};

function UserEvents() {
  const userEvents = useSelector(
    (state: { userEvent: { events: Event[] } }) => state.userEvent.events
  );
  const modalRef = React.useRef<{ open: () => void; close: () => void } | null>(
    null
  );
  const dispatch = useDispatch();
  const [eventIdToRemove, setEventIdToRemove] = React.useState<number | null>(
    null
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleRemoveEvent = (eventId: number, eventTitle: string) => {
    // Add your remove event logic here
    console.log(`Removing event: ${eventTitle} (ID: ${eventId})`);
    //open the modal to confirm removal
    modalRef.current?.open();
    setEventIdToRemove(eventId);
    // You might want to dispatch a Redux action here
  };

  function confirmRemoval() {
    // Logic to confirm removal of the event
    if (eventIdToRemove !== null) {
      dispatch(userEventActions.removeUserEvent(eventIdToRemove));
      console.log("Event removed");
    }
    modalRef.current?.close();
  }

  if (userEvents.length === 0) {
    return (
      <div className={styles.userEventsContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📅</div>
          <div className={styles.emptyTitle}>No Events Yet</div>
          <div className={styles.emptyDescription}>
            You haven't joined any events. Browse available events and join
            some!
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.userEventsContainer}>
        {userEvents.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventImageSection}>
              <img
                src={event.imageUrl}
                alt={event.title}
                className={styles.eventImage}
              />
            </div>

            <div className={styles.eventDetailsSection}>
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>

                <div className={styles.eventDetailItem}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>
                    {formatDate(event.date)}
                  </span>
                </div>

                <div className={styles.eventDetailItem}>
                  <span className={styles.detailLabel}>Time:</span>
                  <span className={styles.detailValue}>{event.time}</span>
                </div>

                <div className={styles.eventDetailItem}>
                  <span className={styles.detailLabel}>Venue:</span>
                  <span className={styles.detailValue}>{event.venue}</span>
                </div>

                <div className={styles.eventDetailItem}>
                  <span className={styles.detailLabel}>Delegates:</span>
                  <span
                    className={`${styles.detailValue} ${styles.delegateCount}`}
                  >
                    {event.delegateCount}{" "}
                    {event.delegateCount === 1 ? "delegate" : "delegates"}
                  </span>
                </div>

                {event.description && (
                  <p className={styles.eventDescription}>{event.description}</p>
                )}
              </div>

              <div className={styles.eventActions}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveEvent(event.id, event.title)}
                >
                  Remove event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal ref={modalRef}>
        <>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Confirm Removal</h2>
            <p className={styles.modalMessage}>
              Are you sure you want to remove this event?
            </p>
            <div className={styles.modalActions}>
              <button className={styles.confirmButton} onClick={confirmRemoval}>
                Yes, remove
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => modalRef.current?.close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}

export default UserEvents;
