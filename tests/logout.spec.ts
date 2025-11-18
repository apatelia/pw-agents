// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation — Menu & Logout', () => {
  test('Navigation — Menu & Logout', async ({ page }) => {
    // 1. Navigate to `https://www.saucedemo.com/`.
    await page.goto('https://www.saucedemo.com/');

    // 2. Login as `standard_user` / `secret_sauce`.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Open the menu (hamburger) and click `Logout`.
    // Use the menu button id if present; fall back to button with accessible name.
    const menuBtn = page.locator('#react-burger-menu-btn');
    if (await menuBtn.count()) {
      await menuBtn.click();
    } else {
      await page.locator('button:has-text("Open Menu")').click();
    }

    // Click the logout link in the sidebar.
    const logout = page.locator('#logout_sidebar_link');
    if (await logout.count()) {
      await logout.click();
    } else {
      await page.locator('a:has-text("Logout")').click();
    }

    // 4. Verify user is returned to the login page.
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
