// src/__tests__/testSetup.ts
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import toast from "react-toastify"

// Mockowanie toast
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
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

// Mockowanie useDispatch
jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    ...originalModule,
    useDispatch: jest.fn(),
  };
});

const mockDispatch = jest.fn();


// Mock Redux store
const mockStore = configureStore({
  reducer: {
    auth: (state = { error: null }, action) => state, // Możesz dodać więcej logiki w reducerze, jeśli to konieczne
  },
});

// Funkcja pomocnicza do renderowania komponentów z mockowanym storem
const renderWithStore = (component: React.ReactNode, initialState = {}) => {
  const store = configureStore({
    reducer: {
      auth: (state = initialState, action) => state,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

// Eksportuj funkcję renderującą i mockowany store
export { renderWithStore, mockStore, mockDispatch, mockNavigate };