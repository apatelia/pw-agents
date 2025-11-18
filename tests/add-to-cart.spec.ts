// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Add to Cart / Remove from Cart', () => {
  test('Add to Cart / Remove from Cart (happy path add)', async ({ page }) => {
    // 1. Navigate to `https://www.saucedemo.com/`.
    await page.goto('https://www.saucedemo.com/');

    // 2. Enter username `standard_user` into the Username field.
    const username = page.locator('[data-test="username"]');
    await username.fill('standard_user');

    // 3. Enter password `secret_sauce` into the Password field.
    const password = page.locator('[data-test="password"]');
    await password.fill('secret_sauce');

    // 4. Click the `Login` button.
    const loginBtn = page.locator('[data-test="login-button"]');
    await loginBtn.click();

    // 5. Click `Add to cart` on the first product.
    const firstAdd = page.locator('button:has-text("Add to cart")').first();
    await firstAdd.click();

    // 6. Verify cart icon badge updates to `1`.
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');
  });
});
