// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout — Happy Path', () => {
  test('Checkout — Happy Path', async ({ page }) => {
    // 1. Navigate to `https://www.saucedemo.com/`.
    await page.goto('https://www.saucedemo.com/');

    // 2. Login as `standard_user` / `secret_sauce`.
    const username = page.locator('[data-test="username"]');
    await username.fill('standard_user');
    const password = page.locator('[data-test="password"]');
    await password.fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Add first product to cart.
    await page.locator('button:has-text("Add to cart")').first().click();

    // 4. Click cart icon to go to `/cart.html`.
    await page.locator('a.shopping_cart_link').click();

    // 5. Click `Checkout`.
    await page.locator('button:has-text("Checkout")').click();

    // 6. Fill checkout information: First Name, Last Name, Postal Code.
    const firstName = page.locator('#first-name');
    const lastName = page.locator('#last-name');
    const postalCode = page.locator('#postal-code');
    await firstName.fill('Jane');
    await lastName.fill('Doe');
    await postalCode.fill('12345');

    // 7. Click `Continue` using a stable `data-test` selector and ensure it's actionable.
    const continueBtn = page.locator('[data-test="continue"]');
    await expect(continueBtn).toBeVisible();
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // 8. Verify order overview contains items and click `Finish`.
    const cartList = page.locator('[data-test="cart-list"]');
    const summaryInfo = page.locator('.summary_info');
    await expect(cartList).toBeVisible();
    await expect(summaryInfo).toBeVisible();
    const finishBtn = page.locator('[data-test="finish"]');
    await expect(finishBtn).toBeVisible();
    await finishBtn.click();

    // 9. Verify confirmation page text is visible.
    await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
  });
});
