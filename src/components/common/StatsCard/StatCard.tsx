import React from "react";
import Styles from "./StatCard.module.scss";
import { Users } from "lucide-react";

function StatCard({
  users,
}: {
  users: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }>;
}) {
  return (
    <div className={Styles.statsCard}>
      <div className={Styles.statsContent}>
        <div className={Styles.statsText}>
          <span className={Styles.statsLabel}>Total Users</span>
          <span className={Styles.statsNumber}>{users.length}</span>
        </div>
        <div className={Styles.statsIcon}>
          <Users size={32} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
