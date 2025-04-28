import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = this.page.getByTestId("email-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.loginButton = this.page.getByTestId("log-in-button");
  }

  /**
   * Fills the username input with the provided username.
   * 
   * @param userName - The username to be entered.
   * @returns A promise that resolves when the username has been filled.
   */
  private async fillUserName(userName: string): Promise<void> {
    await this.userNameInput.fill(userName);
  }

  /**
   * Fills the password input with the provided password.
   * 
   * @param password - The password to be entered.
   * @returns A promise that resolves when the password has been filled.
   */
  private async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button.
   * 
   * @returns A promise that resolves when the login button has been clicked.
   */
  private async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Logs in with the provided username and password.
   * 
   * @param userName - Username to login (defaults to an empty string).
   * @param password - Password to login (defaults to an empty string).
   * @returns A promise that resolves when login actions are complete.
   */
  async login(userName: string = "", password: string = ""): Promise<void> {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
