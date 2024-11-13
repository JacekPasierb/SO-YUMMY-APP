import { fireEvent, screen, waitFor } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import userEvent from "@testing-library/user-event";
import { mockDispatch, mockNavigate, renderWithStore } from "../jest.setup";
import { validate } from "../components/RegisterForm/RegisterFormValidations";
import { toast } from "react-toastify";

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (require("react-redux").useDispatch as jest.Mock).mockReturnValue(
      mockDispatch
    );
  });

  describe("rendering", () => {
    it("should render all form elements", () => {
      renderWithStore(<RegisterForm />);
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByText("Registration")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Sign up" })
      ).toBeInTheDocument();
    });
  });

  describe("form validation", () => {
    it("should show error for empty email", async () => {
      renderWithStore(<RegisterForm />);
      const emailInput = screen.getByPlaceholderText("Email");
      fireEvent.blur(emailInput);
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it("should show error for invalid email", async () => {
      renderWithStore(<RegisterForm />);
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
      renderWithStore(<RegisterForm />);
      const passwordInput = screen.getByPlaceholderText("Password");
      fireEvent.blur(passwordInput);
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it("should validate form values correctly", () => {
      const validValues = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      };
      const errors = validate(validValues);
      expect(errors).toEqual({}); // Oczekujemy, że nie będzie błędów

      const invalidValues = {
        name: "Jo",
        email: "invalid-email",
        password: "123",
      };
      const errorsInvalid = validate(invalidValues);
      expect(errorsInvalid).toEqual({
        name: "Name must be 3 to 12 characters",
        email: "Please enter a valid email address",
        password: "Password must be 6 to 12 characters",
      });
    });
  });

  describe("form submission", () => {
    it("should handle successful submission and reset the form", async () => {
      mockDispatch.mockResolvedValueOnce({ type: "auth/register/fulfilled" });
      renderWithStore(<RegisterForm />);
      await userEvent.type(screen.getByPlaceholderText("Name"), "John Doe");
      await userEvent.type(
        screen.getByPlaceholderText("Email"),
        "john.doe@example.com"
      );
      await userEvent.type(
        screen.getByPlaceholderText("Password"),
        "password123"
      );

      await userEvent.click(screen.getByRole("button", { name: "Sign up" }));
      await waitFor(() => {
        expect(toast.info).toHaveBeenCalledWith(
          "Verification link sent to email. Check your mail."
        );
        expect(screen.getByPlaceholderText("Name")).toHaveValue("");
        expect(screen.getByPlaceholderText("Email")).toHaveValue("");
        expect(screen.getByPlaceholderText("Password")).toHaveValue("");
        expect(mockNavigate).toHaveBeenCalledWith("/signin");
      });
    });

    it("should handle submission error", async () => {
      mockDispatch.mockRejectedValueOnce(new Error("Registration failed."));

      renderWithStore(<RegisterForm />);
      await userEvent.type(screen.getByPlaceholderText("Name"), "John Doe");
      await userEvent.type(
        screen.getByPlaceholderText("Email"),
        "john.doe@example.com"
      );
      await userEvent.type(
        screen.getByPlaceholderText("Password"),
        "password123"
      );
      await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Registration failed.");
      });
    });
  });
});
