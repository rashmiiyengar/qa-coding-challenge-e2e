import { test as base, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { QuestionareUpdatedPage } from "../pages/QuestionareUpdatedPage";
import { LoginPage } from "../pages/LoginPage";
import { TherapistsJobsPage } from "../pages/ThreapistsJobsPage";

type PageFixtures = {
  page: Page;
  homeNavigation:{
    homePage: HomePage;
    loginPage: LoginPage;
    therapistsJobsPage:TherapistsJobsPage
  }
  questionareUpdatedPage: QuestionareUpdatedPage;
};

export const test = base.extend<PageFixtures>({
homeNavigation: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const therapistsJobsPage = new TherapistsJobsPage(page);
    await use({ loginPage, homePage,therapistsJobsPage });
  },    
  questionareUpdatedPage: async ({ page }, use) => {
    const questionareUpdatedPage = new QuestionareUpdatedPage(page);
    await use(questionareUpdatedPage);
  },
});
