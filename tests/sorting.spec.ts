// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { InventoryPage } from './pages/inventory.page';

test.describe('Sorting / Filter Controls', () => {
  test('sorts items by name and price', async ({ page, login }) => {
    await login();
    const inventory = new InventoryPage(page);

    const sortSelect = inventory.sortSelect();

    // Sort Z to A
    await sortSelect.selectOption({ label: 'Name (Z to A)' });
    const firstNameZ = await inventory.firstProductName().innerText();

    // Sort A to Z
    await sortSelect.selectOption({ label: 'Name (A to Z)' });
    const firstNameA = await inventory.firstProductName().innerText();

    // Sort Price (low to high)
    await sortSelect.selectOption({ label: 'Price (low to high)' });
    const firstPriceLow = await inventory.firstProductPrice().innerText();

    // Assert that sorts produced different ordering
    expect(firstNameZ).not.toBe(firstNameA);
    expect(firstPriceLow).toMatch(/\$\d+/);
  });
});
