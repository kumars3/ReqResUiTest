import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private title = this.page.locator('[data-test="title"]');
  private finishButton = this.page.locator('[data-test="finish"]');

  async assertLoaded() {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async assertItemsPresent(names: string[]) {
    for (const name of names) {
      await expect(this.page.locator('.inventory_item_name', { hasText: name })).toBeVisible();
    }
  }

  async finish() {
    await this.finishButton.click();
  }
}