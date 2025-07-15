import {test, expect} from "@playwright/test";
import {loginData} from "./test-data/login.data";
import {LoginPage} from "./pages/login.page";

test.describe("User login to So Yummy", () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl");
    });

    await page.goto("/");
    await page.getByRole("link", {name: "Zaloguj się"}).click();
  });

  test("successful login with correct credentials", async ({page}) => {
    // Arrange
    const userEmail = loginData.userEmail;
    const userPassword = loginData.userPassword;
    const expectedUsername = "user";

    // Act
    const loginPage = new LoginPage(page);

    await loginPage.emailInput.fill(userEmail);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.waitForLoadState("domcontentloaded");

    // Assert
    await expect(loginPage.userName).toBeVisible({timeout: 7000});
    await expect(loginPage.userName).toHaveText(expectedUsername);
  });

  test("unsuccessful login with invalid format email", async ({page}) => {
    // Arrange

    const invalidFormatEmail = "user";
    const expectedMessage = "Podaj prawidłowy adres e-mail";

    // Act
    const loginPage = new LoginPage(page);

    await loginPage.emailInput.fill(invalidFormatEmail);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.emailError).toHaveText(expectedMessage);
  });

  test("unsuccessful login without email", async ({page}) => {
    // Arrange

    const expectedMessage = "Adres e-mail jest wymagany";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.emailInput.fill("");
    await loginPage.emailInput.blur();

    // Assert
    await expect(loginPage.emailError).toHaveText(expectedMessage);
  });

  test("unsuccessful login without password", async ({page}) => {
    // Arrange

    const userEmail = "user@test.pl";
    const expectedMessage = "Hasło jest wymagane";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.emailInput.fill(userEmail);
    await loginPage.passwordInput.fill("");
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedMessage);
  });
});
