/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/admin/manageEvents.module.scss";
import { Edit, Trash2, Plus, Save, X, Upload, ImageIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../redux/adminStore/events-slice";
import Modal from "../../components/common/modal/Modal";

type Event = {
  id: number;
  title: string;
  date: string;
  status: string;
  venue?: string;
  image?: string;
};

function ManageEventsPage() {
  const events = useSelector(
    (state: { events: { events: Event[] } }) => state.events.events
  );

  const dispatch = useDispatch();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    status: "Draft",
    venue: "",
    image: "",
  });

  const editModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const addModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);

  // handleEditEvent opens the edit modal and sets the selected event for editing
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    editModalRef.current?.open();
  };

  // handleSaveEdit dispatches the edit action and closes the modal
  // It also resets the selected event and editing state
  const handleSaveEdit = () => {
    if (selectedEvent) {
      dispatch(
        eventActions.editEvent({
          id: selectedEvent.id,
          updatedEvent: selectedEvent,
        })
      );
    }
    editModalRef.current?.close();
    setSelectedEvent(null);
    setIsEditing(false);
  };

  // handleDeleteEvent opens the delete confirmation modal and sets the selected event for deletion
  // It uses a ref to access the modal component and call its open method
  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    deleteModalRef.current?.open();
  };

  // confirmDelete dispatches the remove action and closes the delete modal
  // It also resets the selected event to null
  const confirmDelete = () => {
    if (selectedEvent) {
      dispatch(eventActions.removeEvents(selectedEvent.id));
    }
    deleteModalRef.current?.close();
    setSelectedEvent(null);
  };

  // handleAddEvent opens the add modal and sets the state for adding a new event
  // It uses a ref to access the modal component and call its open method
  const handleAddEvent = () => {
    setIsAdding(true);
    addModalRef.current?.open();
  };

  // handleSaveNewEvent generates a new ID for the event, dispatches the add action,
  // and closes the add modal. It also resets the new event state
  const handleSaveNewEvent = () => {
    const id = Math.max(...events.map((e) => e.id), 0) + 1;
    dispatch(eventActions.addEvent({ ...newEvent, id }));
    addModalRef.current?.close();
    setNewEvent({
      title: "",
      date: "",
      status: "Draft",
      venue: "",
      image: "",
    });
    setIsAdding(false);
  };

  // handleCancelEdit closes the edit modal and resets the selected event and editing state
  // It uses a ref to access the modal component and call its close method
  const handleCancelEdit = () => {
    editModalRef.current?.close();
    setSelectedEvent(null);
    setIsEditing(false);
  };

  // handleCancelAdd closes the add modal and resets the new event state
  const handleCancelAdd = () => {
    addModalRef.current?.close();
    setNewEvent({
      title: "",
      date: "",
      status: "Draft",
      venue: "",
      image: "",
    });
    setIsAdding(false);
  };

  // handleCancelDelete closes the delete confirmation modal and resets the selected event
  const handleCancelDelete = () => {
    deleteModalRef.current?.close();
    setSelectedEvent(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        if (isEditing && selectedEvent) {
          setSelectedEvent({
            ...selectedEvent,
            image: imageDataUrl,
          });
        } else {
          setNewEvent({
            ...newEvent,
            image: imageDataUrl,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    if (isEditing && selectedEvent) {
      setSelectedEvent({
        ...selectedEvent,
        image: "",
      });
    } else {
      setNewEvent({
        ...newEvent,
        image: "",
      });
    }
  };

  return (
    <div className={styles.manageEventsContainer}>
      <div className={styles.pageHeader}>
        <h1>Manage Events</h1>
        <button className={styles.addEventBtn} onClick={handleAddEvent}>
          <Plus size={20} />
          Add event
        </button>
      </div>

      {/* EventCatalogue should come here but i got the stylings messed up and can't fix it. refer admin.module.scss, eventsCatalogue.module.scss & manageEvents.module.scss */}
      <div className={styles.eventsGrid}>
        {events.map((event: Event) => (
          <div key={event.id} className={styles.eventCard}>
            {event.image && (
              <div className={styles.eventImage}>
                <img src={event.image} alt={event.title} />
              </div>
            )}
            <div className={styles.eventContent}>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDate}>
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className={styles.eventVenue}>
                  {event.venue || "No venue specified"}
                </p>
                <span
                  className={`${styles.status} ${
                    styles[event.status.toLowerCase()]
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <div className={styles.eventActions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteEvent(event)}
                  title="Delete Event"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEditEvent(event)}
                  title="Edit Event"
                >
                  <Edit size={18} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal ref={editModalRef}>
        {selectedEvent && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Edit Event</h2>
              <button className={styles.closeBtn} onClick={handleCancelEdit}>
                <X size={20} />
              </button>
            </div>
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
                placeholder="Enter event title"
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
              <label>Venue</label>
              <input
                type="text"
                value={selectedEvent.venue || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, venue: e.target.value })
                }
                placeholder="Enter venue"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Event Image</label>
              <div className={styles.imageUploadSection}>
                {selectedEvent.image ? (
                  <div className={styles.imagePreview}>
                    <img src={selectedEvent.image} alt="Event preview" />
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={removeImage}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className={styles.imageUploadPlaceholder}>
                    <ImageIcon size={40} />
                    <p>No image selected</p>
                  </div>
                )}
                <label className={styles.uploadBtn}>
                  <Upload size={16} />
                  {selectedEvent.image ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
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
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                value={newEvent.status}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    status: e.target.value,
                  })
                }
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleSaveEdit} className={styles.saveBtn}>
                <Save size={16} />
                Save Changes
              </button>
              <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal ref={addModalRef}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Add New Event</h2>
            <button className={styles.closeBtn} onClick={handleCancelAdd}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.formGroup}>
            <label>Event Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  title: e.target.value,
                })
              }
              placeholder="Enter event title"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Event Date</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Venue</label>
            <input
              type="text"
              value={newEvent.venue || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, venue: e.target.value })
              }
              placeholder="Enter venue"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Event Image</label>
            <div className={styles.imageUploadSection}>
              {newEvent.image ? (
                <div className={styles.imagePreview}>
                  <img src={newEvent.image} alt="Event preview" />
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className={styles.imageUploadPlaceholder}>
                  <ImageIcon size={40} />
                  <p>No image selected</p>
                </div>
              )}
              <label className={styles.uploadBtn}>
                <Upload size={16} />
                {newEvent.image ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <div className={styles.modalActions}>
            <button onClick={handleSaveNewEvent} className={styles.saveBtn}>
              <Plus size={16} />
              Add Event
            </button>
            <button onClick={handleCancelAdd} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal ref={deleteModalRef}>
        {selectedEvent && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Delete Event</h2>
              <button className={styles.closeBtn} onClick={handleCancelDelete}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.deleteConfirmation}>
              <p>Are you sure you want to delete the event:</p>
              <h3>"{selectedEvent.title}"</h3>
              <p>This action cannot be undone.</p>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={confirmDelete}
                className={styles.deleteConfirmBtn}
              >
                <Trash2 size={16} />
                Delete Event
              </button>
              <button onClick={handleCancelDelete} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ManageEventsPage;
