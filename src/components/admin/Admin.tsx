import styles from "./admin.module.scss";
import EventCatalogue from "../Events/EventCatalogue";
import EventAlbum from "../eventAlbum/EventAlbum";
import Notifications from "../Notifications/Notifications";
// import Header from "../header/Header";
// import SideBar from "../sidebar/Sidebar";

const Admin = () => {
  return (
    <div className={styles.adminDashboard}>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {/* Album/Image Section */}
          <EventAlbum />

          {/* Notifications/Notices */}
          <Notifications />

          {/* Event Catalogue */}
          <EventCatalogue />
        </div>
      </div>
    </div>
  );
};

export default Admin;
