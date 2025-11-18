// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { LoginPage } from './pages/login.page';

// Basic accessibility smoke checks (keyboard navigation and ARIA presence)
test.describe('Accessibility Smoke', () => {
  test('keyboard navigation reaches key controls on login and products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Ensure inputs have accessible names
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();

    // Keyboard navigate: focus username, type, press Tab to password, type, press Enter to login
    await loginPage.username.focus();
    await page.keyboard.type('standard_user');
    await page.keyboard.press('Tab');
    await page.keyboard.type('secret_sauce');
    await page.keyboard.press('Enter');

    // Verify Products visible after keyboard login
    await expect(page.getByText('Products')).toBeVisible();
  });
});
