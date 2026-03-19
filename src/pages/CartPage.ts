import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private checkoutButton = this.page.locator('[data-test="checkout"]');
  private title = this.page.locator('[data-test="title"]');

  async assertLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async assertItemPresent(name: string) {
    await expect(this.page.locator('.inventory_item_name', { hasText: name })).toBeVisible();
  }

  async assertItemsPresent(names: string[]) {
    for (const name of names) {
      await this.assertItemPresent(name);
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}