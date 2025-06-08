/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import UniSyncLanding from "../pages/user/Home";
import SignUpPage from "../pages/user/SignUpPage";
import SignIn from "../../UniSync-web/pages/user/SignIn";
import StudentHome from "../../UniSync-web/pages/user/StudentHome";
import { checkAuthLoader, getRole } from "../utils/user/auth";
import { action as signinAction } from "../actions/SignIn.action";
import { action as signupAction } from "../actions/SignUp.action";
import AdminPage from "../pages/admin/AdminPage";
import Root from "../root/admin/Root";
import ManageEventsPage from "../pages/admin/ManageEvents";
import NotificationsPage from "../pages/admin/Notifications";
import SettingsPage from "../pages/admin/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UniSyncLanding />,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "signin",
    element: <SignIn />,
    action: signinAction,
  },
  {
    path: "signup",
    element: <SignUpPage />,
    action: signupAction,
  },
  {
    path: "student-home",
    element: <StudentHome />,
    // loader: checkAuthLoader,
  },
  {
    path: "admin-home",
    element: <Root />,
    // loader: checkAuthLoader,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "manage-events", element: <ManageEventsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

export default router;
