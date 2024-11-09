import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import SigninForm from "../components/SigninForm/SigninForm";
import userEvent from "@testing-library/user-event";

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

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    auth: (state = { error: null }, action) => state,
  },
});

const mockDispatch = jest
  .fn()
  .mockResolvedValueOnce({ type: "auth/logIn/fulfilled" });
(mockStore.dispatch as jest.Mock) = mockDispatch;

describe("SigninForm", () => {
  const renderSigninForm = () => {
    return render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SigninForm />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all form elements", () => {
    renderSigninForm();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should show error for invalid email", async () => {
    renderSigninForm();
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it("should handle successful submission", async () => {
    renderSigninForm();
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "password123"
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});

// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import SigninForm from "../components/SigninForm/SigninForm";
// import { toast } from "react-toastify";
// import { getLogoSrc } from "../helpers/helpers";

//   // Dodaj na początku pliku
// jest.mock("../helpers/helpers", () => ({
//     getLogoSrc: () => "mock-logo.png"
//   }));

// // Mock Redux store
// const mockStore = configureStore({
//   reducer: {
//     auth: (state = { error: null }, action) => state,
//   },
// });

// // Dodajemy typ dla dispatch
// type AppDispatch = typeof mockStore.dispatch;

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockNavigate,
// }));

// // Mock toast
// jest.mock("react-toastify", () => ({
//   toast: {
//     error: jest.fn(),
//     success: jest.fn(),
//   },
// }));

// describe("SigninForm", () => {
//   // Helper function do renderowania z providerami
//   const renderSigninForm = () => {
//     return render(
//       <Provider store={mockStore}>
//         <BrowserRouter>
//           <SigninForm />
//         </BrowserRouter>
//       </Provider>
//     );
//   };

//   beforeEach(() => {
//     // Czyścimy mocki przed każdym testem
//     jest.clearAllMocks();
//   });

//   describe("rendering", () => {
//     it("should render form elements", () => {
//       renderSigninForm();

//       // Sprawdzamy czy są wszystkie elementy
//       expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
//       expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
//       expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
//       expect(screen.getByAltText("Logo")).toBeInTheDocument();
//     });

//     it("should render form title", () => {
//       renderSigninForm();
//       expect(screen.getByText("Sign In")).toBeInTheDocument();
//     });
//   });

//   describe("form validation", () => {
//     it("should show error for invalid email", async () => {
//       renderSigninForm();

//       const emailInput = screen.getByPlaceholderText("Email");
//       await userEvent.type(emailInput, "invalid-email");
//       fireEvent.blur(emailInput);

//       await waitFor(() => {
//         expect(screen.getByText(/Please enter a valid email addres/i)).toBeInTheDocument();
//       });
//     });

//     it("should show error for empty password", async () => {
//       renderSigninForm();

//       const passwordInput = screen.getByPlaceholderText("Password");
//       fireEvent.blur(passwordInput);

//       await waitFor(() => {
//         expect(screen.getByText(/password is required/i)).toBeInTheDocument();
//       });
//     });
//   });

//   describe("form submission", () => {
//     it("should handle successful submission", async () => {
//       renderSigninForm();

//       // Wypełniamy formularz
//       await userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
//       await userEvent.type(screen.getByPlaceholderText("Password"), "password123");

//       // Klikamy submit
//       const submitButton = screen.getByRole("button", { name: "Sign in" });
//       await userEvent.click(submitButton);

//       // Sprawdzamy czy navigate został wywołany
//       await waitFor(() => {
//         expect(mockNavigate).toHaveBeenCalledWith("/");
//       });
//     });

//     it("should handle submission error", async () => {
//       renderSigninForm();

//       // Mockujemy dispatch z poprawnym typem
//       const mockDispatch = jest.fn().mockRejectedValueOnce(new Error("Sign in failed"));
//       (mockStore.dispatch as jest.Mock) = mockDispatch;

//       // Wypełniamy i wysyłamy formularz
//       await userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
//       await userEvent.type(screen.getByPlaceholderText("Password"), "password123");
//       await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

//       // Sprawdzamy czy toast error został wywołany
//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith("Sign in failed. Please try again.");
//       });
//     });
//   });

//   describe("resend verification", () => {
//     it("should show resend button when email not verified", () => {
//       const storeWithError = configureStore({
//         reducer: {
//           auth: (state = { error: "Email not verified" }, action) => state,
//         },
//       });

//       render(
//         <Provider store={storeWithError}>
//           <BrowserRouter>
//             <SigninForm />
//           </BrowserRouter>
//         </Provider>
//       );

//       expect(screen.getByText("Resend verification email")).toBeInTheDocument();
//     });
//   });
// });
