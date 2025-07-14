import {Locator, Page} from "playwright/test";
import {SideMenuComponent} from "../components/side-menu.component";

export class AddRecipePage {
  sideMenu: SideMenuComponent;
  fileInput: Locator;
  titleInput: Locator;
  aboutInput: Locator;
  categorySelect: Locator;
  timeSelect: Locator;
  addIngredientButton: Locator;
  unitInput: Locator;
  recipePreparationInput: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);

    this.fileInput = this.page.locator('input[type="file"]');
    this.titleInput = this.page.getByPlaceholder("Wprowadź tytuł przepisu");
    this.aboutInput = this.page.locator("#about");
    this.categorySelect = this.page.getByLabel("Kategoria");
    this.timeSelect = this.page.getByLabel("Czas");
    this.addIngredientButton = this.page.getByRole("button", {name: "Add ingredient"});
    this.unitInput = this.page.getByRole("spinbutton");
    this.recipePreparationInput = this.page.getByRole("textbox", {name: "Recipe preparation"});
    this.addRecipeButton = this.page.getByRole("button", {name: "Add recipe instructions"});

   
 
  }
}
