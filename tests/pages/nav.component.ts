import { Locator, Page } from '@playwright/test';

export class NavComponent {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async openMenu() {
    if (await this.menuButton.count()) {
      await this.menuButton.click();
    } else {
      await this.page.getByRole('button', { name: /open menu/i }).click();
    }
  }

  async logout() {
    if (await this.logoutLink.count()) {
      await this.logoutLink.click();
    } else {
      await this.page.getByRole('link', { name: /logout/i }).click();
    }
  }
}
