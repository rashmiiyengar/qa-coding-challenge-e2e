import { Locator, Page } from "@playwright/test";
import { scrollIntoView } from "../utils/scrollUtils";

export class TherapistsJobsPage {
  private page: Page;
  private readonly slider: Locator;
  private readonly salaryText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.slider = this.page.locator('input[type="range"]').first();
    this.salaryText = this.page
      .getByTestId("counselor-earnings-calculator")
      .getByText("$");
  }

  /**
   * Fills the username textbox with the provided username.
   *
   * @param username - The username to be entered into the textbox.
   * @returns A promise that resolves when the username has been filled.
   */
  private async scrollToEstimatedEarnings() {
    await this.slider.waitFor({ state: "visible" });
    await scrollIntoView(this.slider);
  }

  /**
   * Gets the current selected hours value from the slider
   * @returns A promise that resolves to the current hours value
   */
  private async getCurrentHours(): Promise<number> {
    try {
      // Try a more general selector first
      await this.page.waitForSelector('input[type="range"]', {state: 'visible', timeout: 5000});
      
      // If you have this.slider already defined elsewhere, use it directly
      const hours = await this.slider.getAttribute("aria-valuetext");
      return hours ? parseInt(hours) : 40;
    } catch (error) {
      console.error('Error getting current hours:', error);
      return 40; // Return default if there's an error
    }
  }

  /**
   * Gets the current displayed salary for the hours
   * @returns A promise and number that resolves to the current salary value as a number
   */
  private async getCurrentSalary(): Promise<number> {
    let salaryText = await this.salaryText.textContent();
    if (!salaryText) return 0;
    return parseInt(salaryText.replace(/[^0-9]/g, ""));
  }

  async moveToMinHours(): Promise<{ hours: number; salary: number }> {
    await this.scrollToEstimatedEarnings();
    await this.slider.focus();

    await this.page.keyboard.press("Home");
    //await this.page.waitForTimeout(3000);
    const hours = await this.getCurrentHours();
    const salary = await this.getCurrentSalary();

    return { hours, salary };
  }

  async moveToMaxHours(): Promise<{ hours: number; salary: number }> {
    await this.scrollToEstimatedEarnings();
    await this.slider.focus();

    await this.page.keyboard.press("End");

    //await this.page.waitForTimeout(3000);
    const hours = await this.getCurrentHours();
    const salary = await this.getCurrentSalary();

    return { hours, salary };
  }

  async moveSliderTo(
    targetHours: number
  ): Promise<{ hours: number; salary: number }> {
    await this.scrollToEstimatedEarnings();
    await this.slider.focus();

    await this.page.keyboard.press("Home");
    await this.page.waitForTimeout(1000);
    await this.page.waitForFunction(async () => {
      const slider = document.querySelector('input[type="range"][value]');
      return slider ? slider.getAttribute("value") !== "40" : false;
    });

    const minHours = await this.getCurrentHours();
    const stepsToMove = targetHours - minHours;

    for (let i = 0; i < stepsToMove; i++) {
      await this.page.keyboard.press("ArrowRight");
      await this.page.waitForTimeout(300);
    }
    const hours = await this.getCurrentHours();
    const salary = await this.getCurrentSalary();

    return { hours, salary };
  }
}
