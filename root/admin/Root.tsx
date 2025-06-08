import React from "react";
import Header from "../../src/components/admin/header/Header";
import SideBar from "../../src/components/admin/sidebar/Sidebar";
import styles from "../../src/components/admin/admincomp/admin.module.scss";
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
