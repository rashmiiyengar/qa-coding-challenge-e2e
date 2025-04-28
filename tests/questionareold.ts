// tests/questionnaire.spec.ts
import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { QuestionnaireFlowPage } from "../src/pages/QuestionareFlowPage";
import { QuestionareUpdatedPage } from "../src/pages/QuestionareUpdatedPage";

test.skip("Complete BetterHelp questionnaire for Individual therapy test3", 
async ({ page }) => {
  const homePage = new HomePage(page);
  const questionnairePage = new QuestionareUpdatedPage(page);

  await homePage.navigateToHomePage();
  await homePage.selectTherapyType("Individual");

  expect(page.url()).toContain("get-started");

  const answers = {
    "Which country are you in?": "United States",
    "What is your gender identity?": "Woman",
    "How old are you?": "49",
    "How do you identify?": "Straight",
    "What is your relationship status?": "Single",
    "How important is religion in your life?": "Important",
    "Which religion do you identify with?": "Hinduism",
    "Do you consider yourself to be spiritual?": "Yes",
    "Have you ever been in therapy before?": "Yes",
    "What led you to consider therapy today?": [
      "I've been feeling depressed",
      "I am grieving",
    ],
  };

  let currentQuestion = await questionnairePage.getCurrentQuestion();
  while (currentQuestion) {
    const answer = answers[currentQuestion.text];
    const actualUI = await questionnairePage.getVisibleQuestionUI();
    await expect(actualUI.visibleOptions).toEqual(
      expect.arrayContaining(currentQuestion.options || [])
    );

    if (answer) {
      await questionnairePage.answerQuestion(currentQuestion, answer);
    } else {
      console.warn(
        `No answer found for "${currentQuestion.text}", stopping.`
      );
      break;
    }
    currentQuestion = await questionnairePage.getCurrentQuestion();
  }
});


test.skip("Complete BetterHelp questionnaire for Individual therapy test4", async ({ page },testInfo) => {
  const homePage = new HomePage(page);
  const questionnairePage = new QuestionnaireFlowPage(page);

  await homePage.navigateToHomePage();
  await homePage.selectTherapyType("Individual");

  expect(page.url()).toContain("get-started");

  const answers = {
    "Which country are you in?": "United States",
    "What is your gender identity?": "Woman",
    "How old are you?": "49",
    "How do you identify?": "Straight",
    "What is your relationship status?": "Single",
    "How important is religion in your life?": "Important",
    "Which religion do you identify with?": "Hinduism",
    "Do you consider yourself to be spiritual?": "Yes",
    "Have you ever been in therapy before?": "Yes",
    "What led you to consider therapy today?": [
      "I've been feeling depressed",
      "I am grieving",
    ],
  };
  
  await questionnairePage.completeQuestionnaire(answers);
  }
);

test.skip("Complete BetterHelp questionnaire for Individual therapy test 5", async ({ page },testInfo) => {
  const homePage = new HomePage(page);
  const questionnairePage = new QuestionareUpdatedPage(page);

  await homePage.navigateToHomePage();
  await homePage.selectTherapyType("Individual");

  expect(page.url()).toContain("get-started");

  const answers = {
    "Which country are you in?": "United States",
    "What is your gender identity?": "Woman",
    "How old are you?": "49",
    "How do you identify?": "Straight",
    "What is your relationship status?": "Single",
    "How important is religion in your life?": "Important",
    "Which religion do you identify with?": "Hinduism",
    "Do you consider yourself to be spiritual?": "Yes",
    "Have you ever been in therapy before?": "Yes",
    "What led you to consider therapy today?": [
      "I've been feeling depressed",
      "I am grieving",
    ],
  };
  
  await questionnairePage.completeQuestionnaire(answers);
  }
);