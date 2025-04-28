import { test } from "../src/fixtures/PageFixture";

test("login to betterhelp", async ({ homeNavigation }) => {
  const { loginPage, homePage } = homeNavigation;
  await test.step("Navigate to the home page", async () => [
    await homePage.navigateToHomePage(),
  ]);

  await test.step("Click Home Page login button", async () => [
    await homePage.clickLoginButton(),
  ]);

  await test.step("Perform Login to betterhelp ", async () => [
    await loginPage.login(process.env.DEMO_USERNAME, process.env.DEMO_PASSWORD),
  ]);
});
