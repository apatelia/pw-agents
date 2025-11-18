import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartListLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.cartListLocator = page.locator('[data-test="cart-list"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  cartList() {
    return this.cartListLocator;
  }
}
