import {test, expect} from "@playwright/test";

test.describe("User login to So Yummy", () => {
  test.only("successful login with correct credentials", async ({page}) => {
    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl-PL");
    });
    
    await page.goto("https://so-yummy-jack.netlify.app/");

    await page.getByRole("link", {name: "Zaloguj się"}).click();

    await page.getByTestId("email-input").fill("user@test.pl");
    await page.getByTestId("password-input").fill("user1234");

    await page.getByRole("button", {name: "Sign in"}).click();

    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByTestId("user-name")).toHaveText("user");
  });

  test("unsuccessful login with invalid format email", async ({page}) => {
    await page.goto("https://so-yummy-jack.netlify.app/");
    await page.getByRole("link", {name: "sign in"}).click();

    await page.getByTestId("email-input").fill("user");
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("email-error")).toHaveText(
      "Please enter a valid email address"
    );
  });

  test("unsuccessful login without email", async ({page}) => {
    await page.goto("https://so-yummy-jack.netlify.app/");
    await page.getByRole("link", {name: "sign in"}).click();

    await page.getByTestId("email-input").fill("");
    await page.getByTestId("email-input").blur();

    await expect(page.getByTestId("email-error")).toHaveText(
      "Email is required"
    );
  });

  test("unsuccessful login without password", async ({page}) => {
    await page.goto("https://so-yummy-jack.netlify.app/");
    await page.getByRole("link", {name: "sign in"}).click();

    await page.getByTestId("email-input").fill("user@test.pl");
    await page.getByTestId("password-input").fill("");
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("password-error")).toHaveText(
      "Password is required"
    );
  });
});
