import { createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/Admin";
import ManageEventsPage, {
  loader as manageEventLoader,
} from "./pages/ManageEvents";
import NotificationsPage from "./pages/Notifications";
import SettingsPage from "./pages/Settings";

const router = createBrowserRouter([
  { path: "/", element: <AdminPage /> },
  {
    path: "manage-events",
    element: <ManageEventsPage />,
    loader: manageEventLoader,
  },
  { path: "notifications", element: <NotificationsPage /> },
  { path: "settings", element: <SettingsPage /> },
]);

export default router;
