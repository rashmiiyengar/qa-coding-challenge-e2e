import { TestInfo, expect } from "@playwright/test";
import { test } from "../src/fixtures/PageFixture";

test.describe("Questionare Suite",{tag
:'@smoke'}, async () => {
  test("Questionare test", async ({
    homeNavigation,
    questionareUpdatedPage,
    page,
  },testInfo:TestInfo) => {
    const {  homePage } = homeNavigation;
    await test.step("Navigate to the home page", async () => [
      await homePage.navigateToHomePage(),

    ]);
    await test.step("Select Therapy Type", async () => {
      await homePage.selectTherapyType("Individual");
      await expect(page.url()).toContain("get-started");
      await testInfo.attach('Login Screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });

    await test.step("Complete Questionare", async () => {
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
      await questionareUpdatedPage.completeQuestionnaire(answers);
    });
  });
});
