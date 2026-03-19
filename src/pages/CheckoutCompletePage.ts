import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  private title = this.page.locator('[data-test="title"]');
  private successHeader = this.page.locator('[data-test="complete-header"]');
  private successText = this.page.locator('[data-test="complete-text"]');

  async assertLoaded() {
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async assertSuccess() {
    await expect(this.successHeader).toHaveText('Thank you for your order!');
    await expect(this.successText).toContainText('Your order has been dispatched');
  }
}