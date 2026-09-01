import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { loadFixture } from '../utils/fixtureLoader';

type UsersFixture = {
  validUser: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    postalCode: string;
  };
};

test.describe('SauceDemo checkout with POM', () => {
  test('complete valid checkout flow', async ({ page }) => {
    const users = loadFixture<UsersFixture>('users.json');
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.expectBackpackAddedToCart();
    await inventoryPage.openCart();

    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.fillCustomerInfo(
      users.validUser.firstName,
      users.validUser.lastName,
      users.validUser.postalCode,
    );
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderConfirmed();
  });
});
