/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import UniSyncLanding from "../pages/user/Home";
import StudentSignUpPage from "../pages/user/StudentSignUpPage";
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
import AdminSignUp from "../pages/admin/AdminSignUp";
import AdminLogin from "../pages/admin/AdminLogin";
import { action as adminSignupAction } from "../actions/AdminSignUp.action";
import RootLayout from "../root/admin/Root";
import UsersPage from "../pages/admin/UsersPage";
import ViewAdminsPage from "../pages/admin/ViewAdminsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UniSyncLanding />,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "student/login",
    element: <SignIn />,
    action: signinAction,
  },
  {
    path: "student/signup",
    element: <StudentSignUpPage />,
    action: signupAction,
  },
  {
    path: "student-home",
    element: <StudentHome />,
    // loader: checkAuthLoader,
  },
  {
    path: "admin/signup",
    element: <AdminSignUp />,
    action: signupAction,
  },
  {
    path: "admin/login",
    element: <AdminLogin />,
    action: adminSignupAction,
  },
  {
    path: "admin-home",
    element: <RootLayout />,
    // loader: checkAuthLoader,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "manage-events", element: <ManageEventsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "admins", element: <ViewAdminsPage /> }, // Placeholder for Admins page
    ],
  },
]);

export default router;
