// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { LoginPage } from './pages/login.page';

test.describe('Login — Missing Fields Validation', () => {
  test('shows validation when username missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');
    const error = loginPage.error();
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/username is required/i);
  });

  test('shows validation when password missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // fill username only
    await loginPage.login('standard_user', '');
    const error = loginPage.error();
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/password is required/i);
  });

  test('shows validation when both fields missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // submit empty form
    await loginPage.loginButton.click();
    const error = loginPage.error();
    await expect(error).toBeVisible();
  });
});
