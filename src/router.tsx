import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path : "calendar",
    element: <Calendar />
  },
  {
    path:"*",
    element: <NotFound />
  }
]);

export default router;
