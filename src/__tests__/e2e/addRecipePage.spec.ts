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

  test("successful add recipe with correct data", async ({page}) => {
    await page
      .locator('input[type="file"]')
      .setInputFiles("./src/__tests__/e2e/files/example.png");

    await page.locator("#title").fill("sernik");
    await page.locator("#about").fill("Opis sernika");
    await page
      .getByRole("combobox", {name: "Kategoria"})
      .selectOption("Desery");
    await page.getByRole("combobox", {name: "Czas"}).selectOption("70");
    await page.getByRole("button", {name: "Add ingredient"}).click();
    await page.locator("#react-select-2-input").fill("cukier");
    await page.locator("#react-select-2-option-279").click();
    
    await page.getByRole("spinbutton").fill("05");
    
    await page.locator("#react-select-3-input").fill("kg");
    await page.locator('#react-select-3-option-2').click();

    // await page.waitForLoadState("domcontentloaded");

    await page
      .getByRole("textbox", {name: "Recipe preparation"})
      .fill(
        "Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. "
      );
    await page.getByRole("button", {name: "Add recipe instructions"}).click();
    await page.getByText("Przepis został pomyślnie").click();
  });
});
