import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = this.page.getByTestId("email-input");
    this.password = this.page.getByTestId("password-input");
    this.loginButton = this.page.getByTestId("log-in-button");
  }

  /**
   * Fills the username textbox with the provided username.
   *
   * @param username - The username to be entered into the textbox.
   * @returns A promise that resolves when the username has been filled.
   */
  private async fillUserNameTextBox(userName: string) {
    await this.userName.fill(userName);
  }

   /**
   * Fills the password textbox with the provided password.
   *
   * @param password - The password to be entered into the textbox.
   * @returns A promise that resolves when the password has been filled.
   */
  private async fillPasswordTextBox(password: string) {
    await this.password.fill(password);
  }

  /**
   * Clicks the login button on the login page.
   *
   * @returns {Promise<void>} A promise that resolves when the login button has been clicked.
   */
  private async clickLoginButton() {
    await this.loginButton.click();
  }

   /**
   * Fills the username textbox with the provided username.
   *
   * @param username - The username to be entered into the textbox defaults to an empty string
   * @returns A promise that resolves when the username has been filled.
   */
  async login(userName: string="", password: string="") {

    await this.fillUserNameTextBox(userName);
    await this.fillPasswordTextBox(password);
    await this.clickLoginButton();
  }
}
