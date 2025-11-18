// spec: tests/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures';

test.describe('Performance Glitch User', () => {
  test('measures inventory load time for performance_glitch_user', async ({ page, login }) => {
    const start = Date.now();
    await login('performance_glitch_user');
    await expect(page.getByText('Products')).toBeVisible();
    const end = Date.now();
    const elapsed = end - start;

    // Log elapsed time for observation; assert that page eventually loads
    console.log('inventory load ms:', elapsed);
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });
});
