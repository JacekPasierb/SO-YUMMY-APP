import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { loginData } from "./test-data/login.data";
import { AddRecipePage } from "./pages/addRecipe.page";

test.describe("Add Recipe Page", () => {
  test.beforeEach(async ({ page }) => {
    const userEmail = loginData.userEmail;
    const userPassword = loginData.userPassword;

    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl");
    });

    await page.goto("/");
    await page.getByRole("link", { name: "Zaloguj się" }).click();

    const loginPage = new LoginPage(page);
    await loginPage.emailInput.fill(userEmail);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const addRecipePage = new AddRecipePage(page);
    await addRecipePage.sideMenu.addRecipeButton.click();
  });

  test("successful add recipe with correct data", async ({ page }) => {
    // await page.waitForLoadState("domcontentloaded");

    // Act
    const addRecipePage = new AddRecipePage(page);
    await addRecipePage.fileInput.setInputFiles(
      "./src/__tests__/e2e/files/example.png"
    );
    await addRecipePage.titleInput.fill("Sernik");
    await addRecipePage.aboutInput.fill("Opis sernika");
    await addRecipePage.categorySelect.selectOption({ label: "Desery" });
    await addRecipePage.timeSelect.selectOption({ label: "70 min" });
    await addRecipePage.addIngredientButton.click();
    await page.locator("#ingredient-select0").fill("cukier");
    await page.locator("#react-select-2-option-279").click();
    await addRecipePage.unitInput.fill("05");
    await page.getByTestId("unit-select").click();
    await page.getByText("kg", { exact: true }).click();
    await addRecipePage.recipePreparationInput.fill(
      "Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. "
    );
    await page.getByRole("button", { name: "Add recipe" }).click();

    await expect(
      page.locator(".Toastify__toast", {
        hasText: "Przepis został pomyślnie dodany",
      })
    ).toBeVisible({ timeout: 15000 });
    // await expect(
    //   page.getByText("Przepis został pomyślnie dodany")
    // ).toBeVisible({ timeout: 15000 });
  });
});
