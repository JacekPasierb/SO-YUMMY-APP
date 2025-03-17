import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {persistor, store} from "./redux/store.js";
import App from "./App";
import "../src/locales/i18n.js";
import "react-toastify/dist/ReactToastify.css";
import {HelmetProvider} from "react-helmet-async";
import {I18nextProvider} from "react-i18next";
import i18n from "../src/locales/i18n.js";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            {" "}
            <I18nextProvider i18n={i18n}>
              <RouterProvider router={router} />
              <ToastContainer />
            </I18nextProvider>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
