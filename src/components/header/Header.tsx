import React from "react";
import styles from "../admin/admin.module.scss";
import { Bell } from "lucide-react";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>Faculty of Applied Sciences</h1>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.notificationBadge}>
          <Bell size={20} />
        </div>
        <div className={styles.logoutBtn}>Logout</div>
      </div>
    </header>
  );
}

export default Header;
