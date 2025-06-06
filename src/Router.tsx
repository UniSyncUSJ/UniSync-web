import { createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/Admin";
import ManageEventsPage from "./pages/ManageEvents";
import NotificationsPage from "./pages/Notifications";
import SettingsPage from "./pages/Settings";
import RootLayout from "./Root";

const router = createBrowserRouter([
  // { path: "/", element: <AdminPage /> },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "manage-events", element: <ManageEventsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

export default router;
