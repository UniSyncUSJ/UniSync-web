import React, { useState } from "react";
import styles from "./notifications.module.scss";

function Notifications() {
  const [notifications] = useState([
    { id: 1, message: "New user registration", time: "2 min ago" },
    { id: 2, message: "Event published successfully", time: "5 min ago" },
    { id: 3, message: "System backup completed", time: "1 hour ago" },
    { id: 4, message: "New feedback received", time: "2 hours ago" },
  ]);
  return (
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
  );
}

export default Notifications;
