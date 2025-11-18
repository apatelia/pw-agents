import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { LoginPage } from './pages/login.page';

export const test = base.extend<{ login: (username?: string, password?: string) => Promise<void> }>({
  // `login` fixture: provides a function that will perform login using the LoginPage POM
  login: [async ({ page }, use) => {
    await use(async (username = 'standard_user', password = 'secret_sauce') => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(username, password);
      await expect(page.getByText('Products')).toBeVisible();
    });
  }, { scope: 'test' }],
});

export { expect };
export { test as base };
