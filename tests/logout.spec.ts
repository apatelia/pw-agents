// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { NavComponent } from './pages/nav.component';
import { LoginPage } from './pages/login.page';

test.describe('Navigation — Menu & Logout', () => {
  test('Navigation — Menu & Logout', async ({ page, login }) => {
    // Login via fixture
    await login();

    const nav = new NavComponent(page);
    await nav.openMenu();
    await nav.logout();

    // Verify user is returned to the login page.
    const loginPage = new LoginPage(page);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
