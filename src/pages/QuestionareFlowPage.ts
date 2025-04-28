import { Locator, Page, expect } from "@playwright/test";
import { Question, QuestionType } from "../types/QuestionTypes";
import { questions } from "../test-data/questionare-data";

export class QuestionnaireFlowPage {
  private readonly page: Page;
  private readonly questions: Question[];
  private readonly activeSlide: Locator;
  private readonly questionHeading: Locator;
  private readonly buttonOption: Locator;
  private readonly activeNextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questions = questions;
    this.activeSlide = page.getByTestId("active-slide");
    this.questionHeading = page
      .getByTestId("active-slide")
      .getByTestId("questionnaire-content-label");
    this.activeNextButton = this.activeSlide.getByTestId("next-button");
    this.buttonOption = page.getByTestId("questionnaire-radio-button");
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
    const dropdown = this.activeSlide.getByRole("combobox").first();
    let dropdownOptions: string[] = [];
  
    if (await dropdown.isVisible()) {
      await dropdown.click(); // Open the dropdown
  
      const dropdownList = this.page.getByRole('listbox');
      if (await dropdownList.isVisible()) {
        dropdownOptions = await dropdownList.getByRole('option').allTextContents();
      }
  
      await this.page.keyboard.press("Escape");
    }

    const buttonOptions = await this.activeSlide
      .getByTestId("questionnaire-radio-button")
      .allTextContents();

    const checkboxOptions = await this.activeSlide
      .getByTestId("checkbox-item")
      .allTextContents();

    visibleOptions = [...buttonOptions, ...checkboxOptions, ...dropdownOptions].filter(opt => opt.trim() !== '');
    
    return {
      headingText: headingText.trim(),
      visibleOptions,
    };
  }

  async getUIAndTestDataQuestions() {
    const currentQuestionFromTestData = await this.getCurrentQuestion();
    const currentQuestionFromUI= await this.getVisibleQuestionUI();
    return { currentQuestionFromTestData,currentQuestionFromUI  };
  }

  async answerQuestion(currentQuestion: Question, answer: string | string[]) {
    if (!currentQuestion) {
      throw new Error("No visible question found");
    }

    switch (currentQuestion.type) {
      case QuestionType.DROPDOWN: {
        const dropdown = this.activeSlide.getByRole("combobox").first();
        await dropdown.click();
        const option = this.page.getByRole("option", {
          name: answer as string,
          exact: true,
        });
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
        await this.activeSlide
          .getByText(answer as string, { exact: true })
          .click();
        break;

      case QuestionType.CHECKBOX:
        const options = answer as string[];
        for (const option of options) {
          // Click on the checkbox with this label text
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
      return;
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
    console.log(currentQuestion)
  }
  }

}
