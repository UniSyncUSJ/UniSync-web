import React from "react";
import styles from "../admin.module.scss";
import { Bell, Calendar, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AdminPanelSettings } from "@mui/icons-material";

function SideBar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>UniSync</h2>
      </div>
      <nav className={styles.navMenu}>
        <div
          className={`${styles.navItem} ${
            isActive("/admin-home") ? styles.active : ""
          }`}
        >
          <Calendar size={20} />
          <Link to="/admin-home" className={styles.navLink}>
            Page
          </Link>
        </div>
        <div
          className={`${styles.navItem} ${
            isActive("/admin-home/manage-events") ? styles.active : ""
          }`}
        >
          <Users size={20} />
          <Link to="/admin-home/manage-events" className={styles.navLink}>
            Manage Events
          </Link>
        </div>
        <div
          className={`${styles.navItem} ${
            isActive("/admin-home/notifications") ? styles.active : ""
          }`}
        >
          <Bell size={20} />
          <Link to="/admin-home/notifications" className={styles.navLink}>
            Notification/Notices
          </Link>
        </div>
        <div
          className={`${styles.navItem} ${
            isActive("/admin-home/settings") ? styles.active : ""
          }`}
        >
          <Settings size={20} />
          <Link to="/admin-home/settings" className={styles.navLink}>
            Settings
          </Link>
        </div>
        <div
          className={`${styles.navItem} ${
            isActive("/admin-home/users") ? styles.active : ""
          }`}
        >
          <Users size={20} />
          <Link to="/admin-home/users" className={styles.navLink}>
            Users
          </Link>
        </div>
        <div
          className={`${styles.navItem} ${
            isActive("/admin-home/admins") ? styles.active : ""
          }`}
        >
          <AdminPanelSettings fontSize="small" />
          <Link to="/admin-home/admins" className={styles.navLink}>
            Admins
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
  );
}

export default SideBar;
