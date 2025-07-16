import {test, expect} from "@playwright/test";
import {LoginPage} from "./pages/login.page";
import {loginData} from "./test-data/login.data";
import {AddRecipePage} from "./pages/addRecipe.page";
import {cleanupTestRecipe} from "./utils/cleanUpTestRecipe";

test.describe("Add Recipe Page", () => {
  test.beforeEach(async ({page}) => {
    const userEmail = loginData.userEmail;
    const userPassword = loginData.userPassword;

    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl");
    });

    await page.goto("/");
    await page.getByRole("link", {name: "Zaloguj się"}).click();

    const loginPage = new LoginPage(page);
    await loginPage.emailInput.fill(userEmail);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const addRecipePage = new AddRecipePage(page);
    await addRecipePage.sideMenu.addRecipeButton.click();
    await page.waitForLoadState("domcontentloaded");
  });

  test.afterEach(async ({page}) => {
    await cleanupTestRecipe(page, "owoce");
  });

  test("successful add recipe with correct data", async ({page}) => {
    // Arrange
    const fileRecipeTest = "./src/__tests__/e2e/files/example.png";
    const titleRecipeTest = "Test Przepis";
    const descriptionRecipeTest = "Test Przepis opis";
    const categoryRecipeTest = "Desery";
    const timeRecipeTest = "70 min";
    const ingredientRecipeTest = "cukier";
    const unitIngredientRecipeTest = "5";
    const instructionsPrepareRecipeTest =
      "Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. ";
    const expectedMessage = "Przepis został pomyślnie dodany";

    // Act
    const addRecipePage = new AddRecipePage(page);
    await addRecipePage.fileInput.setInputFiles(fileRecipeTest);
    await addRecipePage.titleInput.fill(titleRecipeTest);
    await addRecipePage.aboutInput.fill(descriptionRecipeTest);
    await addRecipePage.categorySelect.selectOption({
      label: categoryRecipeTest,
    });
    await addRecipePage.timeSelect.selectOption({label: timeRecipeTest});
    await addRecipePage.addIngredientButton.click();
    await page.locator("#ingredient-select0").fill(ingredientRecipeTest);
    await page.locator("#react-select-2-option-279").click();
    await addRecipePage.unitInput.fill(unitIngredientRecipeTest);
    await page.getByTestId("unit-select").click();
    await page.getByText("kg", {exact: true}).click();
    await addRecipePage.recipePreparationInput.fill(
      instructionsPrepareRecipeTest
    );
    await addRecipePage.addRecipeButton.click();

    await expect(
      page.locator(".Toastify__toast", {
        hasText: expectedMessage,
      })
    ).toBeVisible({timeout: 15000});
  });
});
