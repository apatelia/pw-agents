// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';

test.describe('Checkout — Happy Path', () => {
  test('Checkout — Happy Path', async ({ page, login }) => {
    // Login with fixture
    await login();

    const inventory = new InventoryPage(page);
    await inventory.addFirstToCart();
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInfo('Jane', 'Doe', '12345');

    // Use stable selectors and assertions from the page object
    await expect(checkout.continueButton).toBeVisible();
    await expect(checkout.continueButton).toBeEnabled();
    await checkout.continue();

    await expect(cart.cartList()).toBeVisible();
    await expect(checkout.summary()).toBeVisible();

    await expect(checkout.finishButton).toBeVisible();
    await checkout.finish();

    await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
  });
});
