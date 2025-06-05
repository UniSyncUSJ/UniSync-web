import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Users,
  Settings,
  Edit,
  Image,
  Save,
} from "lucide-react";
import styles from "./admin.module.scss";
import { Link } from "react-router-dom";
import EventCatalogue from "../Events/EventCatalogue";

const Admin = () => {
  const [notifications] = useState([
    { id: 1, message: "New user registration", time: "2 min ago" },
    { id: 2, message: "Event published successfully", time: "5 min ago" },
    { id: 3, message: "System backup completed", time: "1 hour ago" },
    { id: 4, message: "New feedback received", time: "2 hours ago" },
  ]);

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

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
    }
    setIsEditing(false);
    setSelectedEvent(null);
  };

  return (
    <div className={styles.adminDashboard}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>UniSync</h2>
        </div>
        <nav className={styles.navMenu}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <Calendar size={20} />
            <span>Page</span>
          </div>
          <div className={styles.navItem}>
            <Users size={20} />
            <Link to="/manage-events">
              <span>Manage Events</span>
            </Link>
          </div>
          <div className={styles.navItem}>
            <Bell size={20} />
            <Link to="/notifications">
              <span>Notification/Notices</span>
            </Link>
          </div>
          <div className={styles.navItem}>
            <Settings size={20} />
            <Link to="/settings">
              <span>Messages</span>
            </Link>
          </div>
        </nav>
        <div className={styles.navFooter}>
          <p>
            This page includes all the admin functionality to add, manage,
            create/delete/edit, publish/unpublish
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Faculty of Applied Sciences</h1>
          </div>
          <div className={styles.headerRight}>
            <span>Text is bold & large & centered</span>
            <div className={styles.logoutBtn}>Logout</div>
          </div>
        </header>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Album/Image Section */}
          <div className={styles.albumSection}>
            <div className={styles.albumHeader}>
              <h3>Recent Album</h3>
              <button className={styles.editBtn}>
                <Edit size={16} />
                Edit Button
              </button>
            </div>
            <div className={styles.imageGrid}>
              <div className={styles.imagePlaceholder}>
                <Image size={40} />
              </div>
              <div className={styles.imagePlaceholder}>
                <Image size={40} />
              </div>
              <div className={styles.imagePlaceholder}>
                <Image size={40} />
              </div>
              <div className={styles.imagePlaceholder}>
                <Image size={40} />
              </div>
            </div>
            <p className={styles.imageNote}>
              Banner images should include a pattern or suitable image | Color
            </p>
          </div>

          {/* Notifications/Notices */}
          <div className={styles.notificationsSection}>
            <h3>Notifications/Notices</h3>
            <div className={styles.notificationList}>
              {notifications.map((notification) => (
                <div key={notification.id} className={styles.notificationItem}>
                  <div className={styles.notificationContent}>
                    <span>{notification.message}</span>
                    <small>{notification.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Catalogue */}
          <EventCatalogue />
        </div>
        {/* <-- Added missing closing tag for contentArea div */}

        {/* Edit Modal */}
        {isEditing && selectedEvent && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
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
                <button
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <-- Added missing closing tag for mainContent div */}
    </div>
  );
};

export default Admin;
