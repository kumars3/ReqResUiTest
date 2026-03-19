import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private username = this.page.getByPlaceholder('Username');
  private password = this.page.getByPlaceholder('Password');
  private loginButton = this.page.locator('[data-test="login-button"]');

  async open() {
    await this.goto('/');
    await expect(this.username).toBeVisible();
  }

  async login(userid: string, userpassword: string) {
    await this.username.fill(userid);
    await this.password.fill(userpassword);
    await this.loginButton.click();
  }
}