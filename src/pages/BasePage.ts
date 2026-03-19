import { Page } from 'playwright';
import { env } from '../config/env';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async goto(path = ''): Promise<void> {
    await this.page.goto(`${env.baseUrl}${path}`);
  }
}