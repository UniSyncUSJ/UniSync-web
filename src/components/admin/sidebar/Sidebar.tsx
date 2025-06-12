import React from "react";
import styles from "../../../components/admin/admincomp/admin.module.scss";
import { Bell, Calendar, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminPanelSettings } from "@mui/icons-material";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>UniSync</h2>
      </div>
      <nav className={styles.navMenu}>
        <div className={`${styles.navItem} ${styles.active}`}>
          <Calendar size={20} />
          <Link to="/admin-home">Page</Link>
        </div>
        <div className={styles.navItem}>
          <Users size={20} />
          <Link to="/admin-home/manage-events">Manage Events</Link>
        </div>
        <div className={styles.navItem}>
          <Bell size={20} />
          <Link to="/admin-home/notifications">Notification/Notices</Link>
        </div>
        <div className={styles.navItem}>
          <Settings size={20} />
          <Link to="/admin-home/settings">Settings</Link>
        </div>
        <div className={styles.navItem}>
          <Users size={20} />
          <Link to="/admin-home/users">Users</Link>
        </div>
        <div className={styles.navItem}>
          <AdminPanelSettings fontSize="small" />
          <Link to="/admin-home/admins">Admins</Link>
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
