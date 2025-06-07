import { createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ManageEventsPage from "./pages/ManageEvents";
import NotificationsPage from "./pages/Notifications";
import SettingsPage from "./pages/Settings";
import RootLayout from "./Root";
import SignIn from "../../user/src/pages/SignIn";

const router = createBrowserRouter([
  { path: "/signin", element: <SignIn /> },
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
