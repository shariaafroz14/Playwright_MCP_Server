import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(url: string) {
    await this.page.goto(url);
  }
}
