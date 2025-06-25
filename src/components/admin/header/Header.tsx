import styles from "./Header.module.scss";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>Faculty of Applied Sciences</h1>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.notificationBadge}>
          <Bell size={20} />
        </div>
        <div className={styles.logoutBtn} onClick={handleLogout}>Logout</div>
      </div>
    </header>
  );
}

export default Header;
