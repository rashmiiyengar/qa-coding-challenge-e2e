// src/pages/BetterHelpHomePage.ts
import { Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly individualButton:Locator
  private readonly couplesButton:Locator
  private readonly teenButton:Locator
  private readonly loginButton:Locator
  private readonly therapistJobsNavButton:Locator
  private readonly hamburgerMenu:Locator
  private readonly cookieConsentButton:Locator

  constructor(page: Page) {
    this.page = page;
    this.individualButton= page.getByTestId('btn-start-individual');
    this.couplesButton= page.getByTestId('btn-start-couples')
    this.teenButton= page.getByTestId('btn-start-teen');
    this.loginButton=page.getByTestId('login-nav');
    this.hamburgerMenu=page.getByTestId('mobilemenu-toggle');
    this.cookieConsentButton = page.getByTestId('cookie-agree-button'); 
    this.therapistJobsNavButton=page.getByTestId('counselor-nav');
  }
  
  /**
   * Check if hamburger menu is visible as an indicator of mobile view
   * @returns if mobile view or not
   */
  private async isMobileView(): Promise<boolean> {
    try {
      return await this.hamburgerMenu.isVisible({ timeout: 1000 });
    } catch (e) {
      return false;
    }
  }

  /**
   * Navigate to BetterHelp homepage
   */
  async navigateToHomePage() {
    await this.page.goto('/');
    await this.cookieConsentButton.click()
  }
  
  async clickLoginButton(){
    if (await this.isMobileView()) { 
      await this.hamburgerMenu.click();
      await this.loginButton.click()
    }else{
      await this.loginButton.click()
    } 
  }

  async clickTherapistJobsLink(){
    if (await this.isMobileView()) { 
      await this.hamburgerMenu.click();
      await this.therapistJobsNavButton.click()
    }else{
      await this.therapistJobsNavButton.click()
    } 
  }
  /**
   * Select therapy type from homepage
   */
  async selectTherapyType(type: 'Individual' | 'Couples' | 'Teen') {
    switch (type) {
      case 'Individual':
        await this.individualButton.click();
        break;
      case 'Couples':
        await this.couplesButton.click();
        break;
      case 'Teen':
        await this.teenButton.click();
        break;
    }
    
    // Wait for questionnaire to load
    await this.page.waitForURL('**/get-started/**');
  }
}