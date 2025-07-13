import {Locator, Page} from "playwright/test";

export class LoginPage {
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  emailError: Locator;
  passwordError: Locator;
    userName: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.getByTestId("email-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.loginButton = this.page.getByRole("button", {name: "Zaloguj się"});
    this.emailError = this.page.getByTestId("email-error");
    this.passwordError = this.page.getByTestId("password-error");
    this.userName = this.page.getByTestId("user-name");
  }
}
