import styles from "./admin.module.scss";
import EventCatalogue from "../../admin/events/EventCatalogue";
import EventAlbum from "../eventalbum/EventAlbum";
import Notifications from "../../admin/notifications/Notifications";
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
