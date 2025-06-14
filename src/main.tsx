import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "../routes/router.tsx";
import { Provider } from "react-redux";
import store from "../redux/index.ts";
import LoadingPage from "../pages/common/loadingPage/LoadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </StrictMode>
);
