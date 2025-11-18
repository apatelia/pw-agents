// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { InventoryPage } from './pages/inventory.page';

test.describe('Add to Cart / Remove from Cart', () => {
  test('add and remove updates cart badge and button state', async ({ page, login }) => {
    await login();
    const inventory = new InventoryPage(page);

    await inventory.addFirstToCart();
    const badge = inventory.badge();
    await expect(badge).toHaveText('1');

    // Remove the item
    await inventory.removeFirstFromCart();
    await expect(badge).toBeHidden();

    const addBtn = inventory.addToCartButtons.first();
    await expect(addBtn).toHaveText('Add to cart');
  });
});
