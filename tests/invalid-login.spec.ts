// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { LoginPage } from './pages/login.page';

test.describe('Login — Invalid Credentials', () => {
  test('shows error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'bad_pass');

    const error = loginPage.error();
    await expect(error).toBeVisible();
    await expect(page).not.toHaveURL(/inventory.html/);
  });
});
