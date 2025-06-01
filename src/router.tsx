import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

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
    path:"*",
    element: <NotFound />
  }
]);

export default router;
