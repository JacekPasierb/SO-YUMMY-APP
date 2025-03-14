import { fireEvent, screen, waitFor } from "@testing-library/react";
import SigninForm from "../components/SigninForm/SigninForm";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { mockDispatch, mockNavigate, renderWithStore } from "../jest.setup";

describe("SigninForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (require("react-redux").useDispatch as jest.Mock).mockReturnValue(
      mockDispatch
    );
  });

  describe("rendering", () => {
    it("should render all form elements", () => {
      renderWithStore(<SigninForm />);
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Sign in" })
      ).toBeInTheDocument();
    });

    it("should show resend button when email not verified", () => {
      renderWithStore(<SigninForm />, { error: "Email not verified" });

      expect(
        screen.getByText(/resend verification email/i)
      ).toBeInTheDocument();
    });
  });

  describe("form validation", () => {
    it("should show error for empty email", async () => {
      renderWithStore(<SigninForm />);
      const emailInput = screen.getByPlaceholderText("Email");
      fireEvent.blur(emailInput); // Symulacja opuszczenia pola e-mail
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it("should show error for invalid email", async () => {
      renderWithStore(<SigninForm />);
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
      renderWithStore(<SigninForm />);
      const passwordInput = screen.getByPlaceholderText("Password");
      fireEvent.blur(passwordInput);
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it("should show error for password shorter than 6 characters", async () => {
      renderWithStore(<SigninForm />);
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
      renderWithStore(<SigninForm />);
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
      renderWithStore(<SigninForm />);
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

      renderWithStore(<SigninForm />);
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

      renderWithStore(<SigninForm />, { error: "Email not verified" });

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
      renderWithStore(<SigninForm />, { error: "Email not verified" });

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
