// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { LoginPage } from './pages/login.page';

test.describe('Login — Locked Out User', () => {
  test('locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    const error = loginPage.error();
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/locked out/i);
    await expect(page).not.toHaveURL(/inventory.html/);
  });
});
