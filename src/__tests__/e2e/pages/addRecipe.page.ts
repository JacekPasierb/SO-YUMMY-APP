import {Locator, Page} from "playwright/test";
import {SideMenuComponent} from "../components/side-menu.component";

export class AddRecipePage {
  sideMenu: SideMenuComponent;
  //   emailInput: Locator;


  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    // this.emailInput = this.page.getByTestId("email-input");
  }
}
