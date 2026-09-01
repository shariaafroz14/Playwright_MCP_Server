import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  readonly continueButton = this.page.locator('[data-test="continue"]');
  readonly finishButton = this.page.locator('[data-test="finish"]');
  readonly confirmationHeader = this.page.locator('[data-test="complete-header"]');

  constructor(page: Page) {
    super(page);
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderConfirmed() {
    await expect(this.confirmationHeader).toContainText('Thank you for your order!');
  }
}
