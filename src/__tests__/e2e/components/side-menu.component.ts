import {Page, Locator} from "playwright/test";

export class SideMenuComponent {
  addRecipeButton: Locator;
  
  constructor(private page: Page) {
    this.addRecipeButton = this.page
      .getByLabel("Main navigation")
      .getByRole("link", {name: "Dodaj Przepis"});
  }
}
