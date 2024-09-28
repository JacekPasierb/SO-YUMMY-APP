import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/themes/themes";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
          <ThemeProvider theme={lightTheme}>
            <App />
            <ToastContainer />
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
