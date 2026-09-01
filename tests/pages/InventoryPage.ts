import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly backpackAddToCartButton = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  readonly backpackRemoveButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
  readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');

  constructor(page: Page) {
    super(page);
  }

  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectBackpackAddedToCart() {
    await expect(this.backpackRemoveButton).toBeVisible();
  }
}
