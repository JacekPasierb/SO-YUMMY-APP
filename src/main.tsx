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

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ]
  
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
