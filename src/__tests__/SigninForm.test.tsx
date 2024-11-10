import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import SigninForm from "../components/SigninForm/SigninForm";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

// Mockujemy @react-hook/media-query
jest.mock("@react-hook/media-query", () => ({
  useMediaQuery: () => false,
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
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
    auth: (state = { error: null }, action) => state,
  },
});

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
    (require("react-redux").useDispatch as jest.Mock).mockReturnValue(
      mockDispatch
    );
  });

  describe("rendering", () => {
    it("should render all form elements", () => {
      renderSigninForm();
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Sign in" })
      ).toBeInTheDocument();
    });

    it("should show resend button when email not verified", () => {
      const storeWithError = configureStore({
        reducer: {
          auth: (state = { error: "Email not verified" }, action) => state,
        },
      });

      render(
        <Provider store={storeWithError}>
          <BrowserRouter>
            <SigninForm />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText("Resend verification email")).toBeInTheDocument();
    });
  });

  describe("form validation", () => {
    it("should show error for empty email", async () => {
      renderSigninForm();
      const emailInput = screen.getByPlaceholderText("Email");
      fireEvent.blur(emailInput); // Symulacja opuszczenia pola e-mail
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
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

    it("should show error for empty password", async () => {
      renderSigninForm();
      const passwordInput = screen.getByPlaceholderText("Password");
      fireEvent.blur(passwordInput);
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it("should show error for password shorter than 6 characters", async () => {
      renderSigninForm();
      const passwordInput = screen.getByPlaceholderText("Password");
      await userEvent.type(passwordInput, "short"); // Assuming the password must be longer than 6 characters
      fireEvent.blur(passwordInput);
      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("should show error for password longer than 16 characters", async () => {
      renderSigninForm();
      const passwordInput = screen.getByPlaceholderText("Password");
      await userEvent.type(passwordInput, "thisIsAVeryLongPassword123"); // 27 znaków
      fireEvent.blur(passwordInput);
      await waitFor(() => {
        expect(
          screen.getByText(/Password must be less than 16 characters/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe("form submission", () => {
    it("should handle successful submission and reset the form", async () => {
      mockDispatch.mockResolvedValueOnce({ type: "auth/logIn/fulfilled" });
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
        expect(screen.getByPlaceholderText("Email")).toHaveValue(""); // Sprawdzenie, czy pole Email jest puste
        expect(screen.getByPlaceholderText("Password")).toHaveValue("");
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });

    it("should handle submission error", async () => {
      mockDispatch.mockRejectedValueOnce(
        new Error("Sign in failed. Please try again.")
      );

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
        expect(toast.error).toHaveBeenCalledWith(
          "Sign in failed. Please try again."
        );
      });
    });
  });

  describe("Resend Veryfication", () => {
    it("should show error message if resend verification fails", async () => {
      mockDispatch.mockRejectedValueOnce(
        new Error("Failed to send verification email.")
      );

      const storeWithError = configureStore({
        reducer: {
          auth: (state = { error: "Email not verified" }, action) => state,
        },
      });

      render(
        <Provider store={storeWithError}>
          <BrowserRouter>
            <SigninForm />
          </BrowserRouter>
        </Provider>
      );

      // Wprowadź adres e-mail do formularza
      await userEvent.type(
        screen.getByPlaceholderText("Email"),
        "test@example.com"
      );

      // Kliknij przycisk "Resend verification email"
      const resendButton = screen.getByRole("button", {
        name: /resend verification/i,
      });
      await userEvent.click(resendButton);
      // Sprawdź, czy toast o błędzie został wyświetlony
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Failed to send verification email."
        );
      });
    });

    it("should show success message if resend verification is successful", async () => {
      const storeWithSuccess = configureStore({
        reducer: {
          auth: (state = { error: "Email not verified" }, action) => state,
        },
      });

      render(
        <Provider store={storeWithSuccess}>
          <BrowserRouter>
            <SigninForm />
          </BrowserRouter>
        </Provider>
      );
      await userEvent.type(
        screen.getByPlaceholderText("Email"),
        "test@example.com"
      );
      // Kliknij przycisk "Resend verification email"
      const resendButton = screen.getByRole("button", {
        name: /resend verification/i,
      });
      await userEvent.click(resendButton);

      // Sprawdź, czy toast o błędzie został wyświetlony
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          "Verification email sent successfully!"
        );
      });
    });
  });
});
