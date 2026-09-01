import { test, expect } from '@playwright/test';

// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Checkout journey', () => {
  test('Complete valid checkout flow', async ({ page }) => {
    // Open the SauceDemo login page and sign in with a valid user.
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input[data-test="login-button"]').click();

    // Add a product to the cart and open the cart.
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('a[data-test="shopping-cart-link"]').click();

    // Start checkout and complete the required shipping information.
    await page.locator('button[data-test="checkout"]').click();
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    await page.locator('input[data-test="continue"]').click();

    // Review the order and finish the purchase.
    await page.locator('button[data-test="finish"]').click();

    // Verify a success message confirms the order was placed.
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
  });
});
