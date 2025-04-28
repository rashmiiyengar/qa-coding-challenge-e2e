import { Locator, Page, expect } from "@playwright/test";
import { Question, QuestionType } from "../types/QuestionTypes";
import { questions } from "../test-data/questionare-data";

export class QuestionareUpdatedPage {
  private readonly page: Page;
  private readonly questions: Question[];
  private readonly activeSlide: Locator;
  private readonly questionHeading: Locator;
  private readonly activeNextButton: Locator;
  private readonly buttonOption: Locator;
  private readonly dropdown: Locator;
  private readonly buttonOptions: Locator;
  private readonly checkboxOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questions = questions;

    // Locators initialization in the constructor
    this.activeSlide = page.getByTestId("active-slide");
    this.questionHeading = this.activeSlide.getByTestId("questionnaire-content-label");
    this.activeNextButton = this.activeSlide.getByTestId("next-button");
    this.buttonOption = page.getByTestId("questionnaire-radio-button");
    this.dropdown = this.activeSlide.getByRole("combobox").first();
    this.buttonOptions = this.activeSlide.getByTestId("questionnaire-radio-button");
    this.checkboxOptions = this.activeSlide.getByTestId("checkbox-item");
  }

  /**
   * Get current question from the page
   */
  async getCurrentQuestion(): Promise<Question | null> {
    const headingLocator = this.questionHeading;

    if (await headingLocator.isVisible()) {
      const headingText = (await headingLocator.textContent())?.trim() || "";
      const matchingQuestion = this.questions.find((question) =>
        new RegExp(question.text, "i").test(headingText)
      );

      return matchingQuestion || null;
    }
    return null;
  }

  async getVisibleQuestionUI() {
    const headingText = (await this.questionHeading.textContent()) || "";
    let visibleOptions: string[] = [];

    // Handling Dropdown options
    let dropdownOptions: string[] = [];
    if (await this.dropdown.isVisible()) {
      await this.dropdown.click();
      const dropdownList = this.page.getByRole('listbox');
      if (await dropdownList.isVisible()) {
        dropdownOptions = await dropdownList.getByRole('option').allTextContents();
      }
      await this.page.keyboard.press("Escape"); // Close dropdown
    }

    // Handling button options
    const buttonOptions = await this.buttonOptions.allTextContents();

    // Handling checkbox options
    const checkboxOptions = await this.checkboxOptions.allTextContents();

    // Combine all visible options
    visibleOptions = [...buttonOptions, ...checkboxOptions, ...dropdownOptions].filter(opt => opt.trim() !== '');
    
    return {
      headingText: headingText.trim(),
      visibleOptions,
    };
  }

  async getUIAndTestDataQuestions() {
    const currentQuestionFromTestData = await this.getCurrentQuestion();
    const currentQuestionFromUI = await this.getVisibleQuestionUI();
    return { currentQuestionFromTestData, currentQuestionFromUI };
  }

  async answerQuestion(currentQuestion: Question, answer: string | string[]) {
    if (!currentQuestion) {
      throw new Error("No visible question found");
    }

    switch (currentQuestion.type) {
      case QuestionType.DROPDOWN: {
        await this.dropdown.click();
        const option = this.page.getByRole("option", { name: answer as string, exact: true });
        await option.waitFor({ state: "visible" });
        if (await this.activeNextButton.isVisible()) {
          await option.click();
          await this.clickActiveSlideNext();
        } else {
          await option.click();
        }
        break;
      }

      case QuestionType.BUTTON:
        await this.activeSlide.getByText(answer as string, { exact: true }).click();
        break;

      case QuestionType.CHECKBOX:
        const options = answer as string[];
        for (const option of options) {
          await this.activeSlide
            .getByText(option, { exact: true })
            .locator("..")
            .click();
        }
        await this.clickActiveSlideNext();
        break;
    }
  }

  /**
   * Click the Next or Continue button
   */
  private async clickActiveSlideNext() {
    const nextVisible = await this.activeNextButton.isVisible();
    if (nextVisible) {
      await this.activeNextButton.click();
    }
  }

  private async assertVisibleOptions(expectedOptions: string[]) {
    const actualUI = await this.getVisibleQuestionUI();
    await expect(actualUI.visibleOptions).toEqual(expect.arrayContaining(expectedOptions));
  }

  async completeQuestionnaire(answers: Record<string, string | string[]>) {
    let currentQuestion = await this.getCurrentQuestion();
    while (currentQuestion) {
      const answer = answers[currentQuestion.text];
      await this.assertVisibleOptions(currentQuestion.options || []);
      if (answer) {
        await this.answerQuestion(currentQuestion, answer);
      } else {
        console.warn(
          `No answer found for "${currentQuestion.text}", stopping.`
        );
        break;
      }
      currentQuestion = await this.getCurrentQuestion();
    }
  }
}
