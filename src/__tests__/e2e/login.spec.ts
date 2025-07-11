import {test, expect} from "@playwright/test";

test("login with correct credentials", async ({page}) => {
  await page.goto("https://so-yummy-jack.netlify.app/");

  await page.getByRole("link", {name: "sign in"}).click();
  await page.locator("form div").nth(1).click();
  await page.getByRole("textbox", {name: "Email"}).fill("user@test.pl");
  await page.getByRole("textbox", {name: "password"}).click();
  await page.getByRole("textbox", {name: "password"}).fill("user1234");
  await page.getByRole("button", {name: "Sign in"}).click();

  await expect(page.getByText("user")).toBeVisible();
});

test("login with invalid format email", async ({page}) => {
  await page.goto("https://so-yummy-jack.netlify.app/");

  await page.getByRole("link", {name: "sign in"}).click();
  await page.locator("form div").nth(1).click();
  await page.getByRole("textbox", {name: "Email"}).fill("user");
  await page.getByRole("textbox", {name: "password"}).click();

  await page.getByText('Podaj prawidłowy adres e-mail').click();


  await expect(page.getByText('Podaj prawidłowy adres e-mail')).toBeVisible();


});
