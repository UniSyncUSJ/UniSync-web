import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn, { action as signinAction } from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import SignUpPage, { action as signupAction } from "./pages/SignUp";
import StudentHome from "./pages/StudentHome";
import { checkAuthLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: checkAuthLoader,
  },
  {
    path: "/signin",
    element: <SignIn />,
    action: signinAction,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    action: signupAction,
  },
  {
    path: "/student-home",
    element: <StudentHome />,
    loader: checkAuthLoader,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
