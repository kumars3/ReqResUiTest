import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private title = this.page.locator('[data-test="title"]');
  private menuButton = this.page.locator('#react-burger-menu-btn');
  private logoutLink = this.page.locator('#logout_sidebar_link');
  private cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  private cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

  private itemCard(name: string) {
    return this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: name })
    });
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Products');
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addItem(name: string) {
    await this.itemCard(name).getByRole('button', { name: /add to cart/i }).click();
  }

  async assertCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}