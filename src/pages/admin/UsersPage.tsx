/* eslint-disable @typescript-eslint/no-unused-vars */

import { Users } from "lucide-react";
import Styles from "./userManage.module.scss";
import StatCard from "../../components/common/StatsCard/StatCard";
import UserListComponent from "../../components/common/userList/UserListComponent";

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
  },
];

export default function UsersPage() {
  return (
    <div className={Styles.container}>
      {/* Header Section */}
      <div className={Styles.header}>
        <div className={Styles.headerContent}>
          <div className={Styles.headerIcon}>
            <Users size={24} />
          </div>
          <div className={Styles.headerText}>
            <h1>User Management</h1>
            <p>Manage user accounts and permissions</p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <StatCard users={users} />

      {/* Users List */}
      <UserListComponent title="Users" userList={users} />
    </div>
  );
}
