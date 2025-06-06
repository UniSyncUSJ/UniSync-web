import React from "react";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/Sidebar";
import styles from "./components/admin/admin.module.scss";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className={styles.adminDashboard}>
        <SideBar />
        <div className={styles.mainContent}>
          <Header />
          <div className={styles.contentArea}>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
