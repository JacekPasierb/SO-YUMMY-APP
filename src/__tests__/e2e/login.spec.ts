import {test, expect} from "@playwright/test";

test.describe("User login to So Yummy", () => {
  test("login with correct credentials", async ({page}) => {
    await page.goto("https://so-yummy-jack.netlify.app/");

    await page.getByRole("link", {name: "sign in"}).click();

    await page.getByTestId("email-input").fill("user@test.pl");
    await page.getByTestId("password-input").fill("user1234");

    await page.getByRole("button", {name: "Sign in"}).click();

    await expect(page.getByText("user")).toBeVisible();
  });

  test("login with invalid format email", async ({page}) => {
    await page.goto("https://so-yummy-jack.netlify.app/");
    await page.getByRole("link", {name: "sign in"}).click();

    await page.getByTestId("email-input").fill("user");
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("email-error")).toHaveText(
      "Please enter a valid email address"
    );
  });
});
