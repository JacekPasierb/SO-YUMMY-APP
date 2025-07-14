import {test, expect} from "@playwright/test";
import {LoginPage} from "./pages/login.page";
import {loginData} from "./test-data/login.data";
import {AddRecipePage} from "./pages/addRecipe.page";

test.describe("Add Recipe Page", () => {
  test.beforeEach(async ({page}) => {
    const userEmail = loginData.userEmail;
    const userPassword = loginData.userPassword;

    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl-PL");
    });

    await page.goto("/");
    await page.getByRole("link", {name: "Zaloguj się"}).click();

    const loginPage = new LoginPage(page);
    await loginPage.emailInput.fill(userEmail);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const addRecipePage = new AddRecipePage(page);
    await addRecipePage.sideMenu.addRecipeButton.click();
  });

  test.afterEach(async ({page}) => {
    // zamknij toast, jeśli został
    const toasts = page.locator(".Toastify__toast");
    if ((await toasts.count()) > 0) {
      await page.waitForSelector(".Toastify__toast", {state: "detached"});
    }
  });

  test.only("successful add recipe with correct data", async ({page}) => {
    // await page.waitForLoadState("domcontentloaded");

    await page
      .locator('input[type="file"]')
      .setInputFiles("./src/__tests__/e2e/files/example.png");

    await page.getByPlaceholder("Wprowadź tytuł przepisu").fill("Sernik");
    await page.locator("#about").fill("Opis sernika");

    await page.getByLabel("Kategoria").selectOption({label: "Desery"});
    await page.getByLabel("Czas").selectOption({label: "70 min"});
    await page.getByRole("button", {name: "Add ingredient"}).click();
    await page.locator("#react-select-2-input").fill("cukier");
    await page.locator("#react-select-2-option-279").click();

    await page.getByRole("spinbutton").fill("05");

    // await page
    //   .getByRole("list", {name: "Ingredients list"})
    //   .locator("svg")
    //   .nth(1)
    //   .click();
    
    // await page.getByRole("option", {name: "kg"}).click();
    await page.locator('#unit-select').click();
    await page.getByText('kg', { exact: true }).click();
    
    await page
      .getByRole("textbox", {name: "Recipe preparation"})
      .fill(
        "Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. "
      );
    await page.getByRole("button", {name: "Add recipe instructions"}).click();

    await expect(
      page.locator(".Toastify__toast", {
        hasText: "Przepis został pomyślnie dodany",
      })
    ).toBeVisible({timeout: 15000});
  });
});
