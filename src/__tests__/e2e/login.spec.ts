import {test, expect} from "@playwright/test";
import {loginData} from "./test-data/login.data";

test.describe("User login to So Yummy", () => {
  test.beforeEach(async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl-PL");
    });

    await page.goto("/");
  });

  test("successful login with correct credentials", async ({page}) => {
    // Arrange
    const userEmail = loginData.userEmail;
    const userPassword = loginData.password;
    const expectedUsername = "user";

    // Act
    await page.getByRole("link", {name: "Zaloguj się"}).click();
    await page.getByTestId("email-input").fill(userEmail);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByRole("button", {name: "Zaloguj się"}).click();

    await page.waitForLoadState("domcontentloaded");

    // Assert
    await expect(page.getByTestId("user-name")).toBeVisible({timeout: 7000});
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("unsuccessful login with invalid format email", async ({page}) => {
    // Arrange

    const invalidFormatEmail = "user";
    const expectedMessage = "Podaj prawidłowy adres e-mail";

    // Act

    await page.getByRole("link", {name: "Zaloguj się"}).click();
    await page.getByTestId("email-input").fill(invalidFormatEmail);
    await page.getByTestId("password-input").click();

    // Assert
    await expect(page.getByTestId("email-error")).toHaveText(expectedMessage);
  });

  test("unsuccessful login without email", async ({page}) => {
    // Arrange

    const expectedMessage = "Adres e-mail jest wymagany";

    // Act

    await page.getByRole("link", {name: "Zaloguj się"}).click();
    await page.getByTestId("email-input").fill("");
    await page.getByTestId("email-input").blur();

    // Assert
    await expect(page.getByTestId("email-error")).toHaveText(expectedMessage);
  });

  test("unsuccessful login without password", async ({page}) => {
    // Arrange

    const userEmail = "user@test.pl";
    const expectedMessage = "Hasło jest wymagane";

    // Act

    await page.getByRole("link", {name: "Zaloguj się"}).click();

    await page.getByTestId("email-input").fill(userEmail);
    await page.getByTestId("password-input").fill("");
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("password-error")).toHaveText(
      expectedMessage
    );
  });
});
