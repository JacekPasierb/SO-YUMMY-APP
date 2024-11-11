// src/jest.setup.ts
import "@testing-library/jest-dom"; // Importuj dodatkowe matchery
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "./redux/store";

// Mockowanie toast
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

// Mockujemy @react-hook/media-query
jest.mock("@react-hook/media-query", () => ({
  useMediaQuery: () => false,
}));

const mockNavigate = jest.fn();
// Mockowanie useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


const mockDispatch = jest.fn();
// Mockowanie useDispatch
jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    ...originalModule,
    useDispatch: jest.fn(),
  };
});

// Wyciszenie ostrzeżeń React Router
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes("React Router")) return; // Wycisz ostrzeżenia związane z React Router
  originalWarn(...args); // Wywołaj oryginalną funkcję warn
};

// Funkcja pomocnicza do renderowania komponentów z mockowanym storem
const renderWithStore = (component: React.ReactNode, initialState = {}) => {
  const store = configureStore({
    reducer: {
      auth: (state = initialState, action) => state,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

// Eksportuj funkcję renderującą i mockowane elementy
export { renderWithStore, mockDispatch, mockNavigate };
