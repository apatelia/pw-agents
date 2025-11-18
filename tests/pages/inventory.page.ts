import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly sortSelectLocator: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly images: Locator;
  readonly inventoryList: Locator;
  readonly cartLink: Locator;
  readonly badgeLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortSelectLocator = page.getByRole('combobox');
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.removeButtons = page.getByRole('button', { name: 'Remove' });
    // product name and price elements don't expose stable accessible names,
    // use the product-specific CSS classes which are stable on the page.
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.images = page.getByRole('img');
    this.inventoryList = page.getByRole('list');
    this.cartLink = page.locator('a.shopping_cart_link');
    this.badgeLocator = page.locator('.shopping_cart_badge');
  }

  sortSelect() {
    return this.sortSelectLocator;
  }

  async addFirstToCart() {
    await this.addToCartButtons.first().click();
  }

  async removeFirstFromCart() {
    await this.removeButtons.first().click();
  }

  firstProductName() {
    return this.productNames.first();
  }

  firstProductPrice() {
    return this.productPrices.first();
  }

  async openCart() {
    await this.cartLink.click();
  }

  badge() {
    return this.badgeLocator;
  }

  imagesLocator() {
    return this.images;
  }

  list() {
    return this.inventoryList;
  }
}
