import { TestInfo, expect } from "@playwright/test";
import { test } from "../src/fixtures/PageFixture";

test.describe("Test Estimated earnings with BetterHelp", async () => {
  test(
    "Test average salary for maximum hours for therapist",
    { tag: "@therapistjobs" },
    async ({ homeNavigation, page }, testInfo: TestInfo) => {
      const { homePage, therapistsJobsPage } = homeNavigation;
      await test.step("Navigate To Home Page", async () => {
        await homePage.navigateToHomePage();
      });

      await test.step("Go to Therapist jobs from Home page", async () => {
        await homePage.clickTherapistJobsLink();
      });

      await test.step("Move to maximum hours", async () => {
        const maxHours = await therapistsJobsPage.moveToMaxHours();
        await testInfo.attach("Minimum hours screenshot", {
          body: await page.screenshot(),
          contentType: "image/png",
        });
        await expect(maxHours.hours).toBe(50);
        await expect(maxHours.salary).toBeCloseTo(150800);
      });
    }
  );

  test(
    "Test average salary for minimum hours for therapist",
    { tag: "@therapistjobs" },
    async ({ homeNavigation, page }, testInfo: TestInfo) => {
      const { homePage, therapistsJobsPage } = homeNavigation;
      await test.step("Navigate To Home Page", async () => {
        await homePage.navigateToHomePage();
      });

      await test.step("Go to Therapist jobs from Home page", async () => {
        await homePage.clickTherapistJobsLink();
      });

      await test.step("Move to minimum hours", async () => {
        const minHours = await therapistsJobsPage.moveToMinHours();
        await testInfo.attach("Minimum hours screenshot", {
          body: await page.screenshot(),
          contentType: "image/png",
        });
        await expect(minHours.hours).toBe(30);
        await expect(minHours.salary).toBe(78000);
      });
    }
  );

  test(
    "Test average salary for userdefined hours for therapist",
    { tag: "@therapistjobs" },
    async ({ homeNavigation, page }, testInfo: TestInfo) => {
      const { homePage, therapistsJobsPage } = homeNavigation;
      await test.step("Navigate To Home Page", async () => {
        await homePage.navigateToHomePage();
      });

      await test.step("Go to Therapist jobs from Home page", async () => {
        await homePage.clickTherapistJobsLink();
      });

      await test.step("Move to minimum hours", async () => {
        const minHours = await therapistsJobsPage.moveSliderTo(66);
        await testInfo.attach("Minimum hours screenshot", {
          body: await page.screenshot(),
          contentType: "image/png",
        });
        await expect(minHours.hours).toBe(46);
        await expect(minHours.salary).toBe(136240);
      });
    }
  );
});
