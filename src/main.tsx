import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "../src/routes/router.tsx";
import { Provider } from "react-redux";
import store from "../src/redux/index.ts";
import LoadingPage from "../src/pages/common/loadingPage/LoadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </StrictMode>
);
