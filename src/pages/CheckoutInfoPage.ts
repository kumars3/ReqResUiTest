import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ShippingDetails } from '../core/random';

export class CheckoutInfoPage extends BasePage {
  private title = this.page.locator('[data-test="title"]');
  private firstName = this.page.locator('[data-test="firstName"]');
  private lastName = this.page.locator('[data-test="lastName"]');
  private postalCode = this.page.locator('[data-test="postalCode"]');
  private continueButton = this.page.locator('[data-test="continue"]');

  async assertLoaded() {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async enterShipping(details: ShippingDetails) {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.postalCode.fill(details.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }
}