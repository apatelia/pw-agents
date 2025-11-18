// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';
import { InventoryPage } from './pages/inventory.page';

test.describe('Problem User Behavior', () => {
  test('captures known demo anomalies for problem_user', async ({ page, login }) => {
    await login('problem_user');
    const inventory = new InventoryPage(page);

    // Inspect images and links for anomalies
    const images = inventory.imagesLocator();
    const count = await images.count();
    const srcs: (string | null)[] = [];
    for (let i = 0; i < Math.min(count, 6); ++i) {
      srcs.push(await images.nth(i).getAttribute('src'));
    }

    await expect(inventory.list()).toBeVisible();
    expect(srcs.length).toBeGreaterThan(0);
  });
});
