import {test, expect} from "@playwright/test";

test.describe("Add Recipe Page", () => {
  test.beforeEach(async ({page}) => {
    const userEmail = "user@test.pl";
    const userPassword = "user1234";

    await page.addInitScript(() => {
      localStorage.setItem("i18nextLng", "pl-PL");
    });

    await page.goto("/");
    await page.getByRole("link", {name: "Zaloguj się"}).click();
    await page.getByTestId("email-input").fill(userEmail);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByRole("button", {name: "Zaloguj się"}).click();
  });

  test("successful add recipe with correct data", async ({page}) => {
    // await page.waitForLoadState("domcontentloaded");
    // await page.locator("#root > div._container_17j48_1 > header > div > nav > a:nth-child(2)").click();
    // await page.locator("._uploadPlaceholder_voe60_1").click();
    // await page
    //   .locator("body")
    //   .setInputFiles("Granatowa Niebieska Motywacyjna Tapeta Na Pulpit.png");
    // await page
    //   .getByRole("textbox", {name: "Wprowadź tytuł przepisu"})
    //   .fill("Sernik");
    // await page
    //   .getByRole("textbox", {name: "Wprowadź opis przepisu"})
    //   .fill("Opis sernika");
    // await page.locator("body").selectOption("Desery");
    // await page.locator("body").selectOption("70");
    // await page.getByRole("button", {name: "Add ingredient"}).click();
    // await page
    //   .getByRole("list", {name: "Ingredients list"})
    //   .locator("svg")
    //   .first()
    //   .click();
    // await page.locator("#react-select-2-input").fill("ser");
    // await page.getByRole("option", {name: "Ser", exact: true}).click();
    // await page.getByRole("spinbutton").click();
    // await page.getByRole("spinbutton").fill("05");
    // await page.getByRole("option", {name: "kg"}).click();
    // await page
    //   .getByRole("textbox", {name: "Recipe preparation"})
    //   .fill(
    //     "Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. Przepis testowy. "
    //   );
    // await page.getByRole("button", {name: "Add recipe instructions"}).click();
    // await page.getByText("Przepis został pomyślnie").click();
  });
});
