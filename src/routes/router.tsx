/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../pages/common/loadingPage/LoadingPage.module.scss";
import ErrorPage from "../pages/common/errorPage/errorPage.module.scss";

// 🔁 Lazy loaded pages
const UniSyncLanding = lazy(_c = () => import("../pages/user/home/StudentHome"));
const StudentSignUpPage = lazy(() => import("../pages/user/StudentSignUpPage"));
const SignIn = lazy(() => import("../pages/user/SignIn"));
const StudentHome = lazy(() => import("../pages/user/StudentHome"));
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const ManageEventsPage = lazy(() => import("../pages/admin/ManageEvents"));
const NotificationsPage = lazy(() => import("../pages/admin/Notifications"));
const SettingsPage = lazy(() => import("../pages/admin/Settings"));
const AdminSignUp = lazy(() => import("../pages/admin/AdminSignUp"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const UsersPage = lazy(() => import("../pages/admin/UsersPage"));
const ViewAdminsPage = lazy(() => import("../pages/admin/ViewAdminsPage"));
const UserEvents = lazy(() => import("../pages/user/userEvents/UserEvents"));
const AdminLayout = lazy(() => import("../layouts/admin/AdminLayout"));

// 🔁 Actions
import Academics from "../components/user/academics/Academics";
import MasterCalendar from "../pages/student/masterCalendar/MasterCalendar";
import MarketPlace from "../pages/student/marketPlace/MarketPlace";
import UserCart from "../pages/user/userCart/UserCart";

const withSuspense = (element: React.ReactElement) => (
  <Suspense fallback={<Loading />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<UniSyncLanding />),
    errorElement: <ErrorPage />,
  },
  {
    path: "student/signin",
    element: withSuspense(<SignIn />),
    // action: signinAction,
  },
  {
    path: "student/signup",
    element: withSuspense(<SignUp />),
    // action: signupAction,
  },
  {
    path: "student/home",
    element: withSuspense(<StudentHome />),
    // loader: checkAuthLoader,
    children: [
      {
        path: "my-events",
        element: withSuspense(<UserEvents />),
      },
      {
        path: "my-schedule",
        element: withSuspense(<MasterCalendar />),
      },
      {
        path: "academics",
        element: withSuspense(<Academics />),
      },
      {
        path: "marketplace",
        element: withSuspense(<MarketPlace />),
      },
      { path: "my-cart", element: withSuspense(<UserCart />) },
    ],
  },
  {
    path: "admin/signup",
    element: withSuspense(<AdminSignUp />),
    // action: signupAction,
  },
  {
    path: "admin/signin",
    element: withSuspense(<AdminLogin />),
    // action: adminSignupAction,
  },
  {
    path: "admin/home",
    element: withSuspense(<AdminLayout />),
    // loader: checkAuthLoader,
    children: [
      { index: true, element: withSuspense(<AdminPage />) },
      { path: "manage-events", element: withSuspense(<ManageEventsPage />) },
      { path: "notifications", element: withSuspense(<NotificationsPage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) },
      { path: "users", element: withSuspense(<UsersPage />) },
      { path: "admins", element: withSuspense(<ViewAdminsPage />) },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
