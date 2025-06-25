import React from "react";
import StatCard from "../../components/common/StatsCard/StatCard";
import Styles from "./userManage.module.scss";
import { Users } from "lucide-react";
import UserListComponent from "../../components/common/userList/UserListComponent";

const admins = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
  },
];
function ViewAdminsPage() {
  return (
    <>
      <div className={Styles.container}>
        {/* Header Section */}
        <div className={Styles.header}>
          <div className={Styles.headerContent}>
            <div className={Styles.headerIcon}>
              <Users size={24} />
            </div>
            <div className={Styles.headerText}>
              <h1>Admin Management</h1>
              <p>Manage admin accounts and permissions</p>
            </div>
          </div>
        </div>
        <StatCard users={admins} />
        <UserListComponent title="admin" userList={admins} />
      </div>
    </>
  );
}

export default ViewAdminsPage;
