import { expect, test } from '@playwright/test';

test.describe('OrangeHRM authentication', () => {
    test('logs in and displays the dashboard', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await page.locator('input[name="username"]').fill('Admin');
        await page.locator('input[name="password"]').fill('admin123');
        await page.locator('button[type="submit"]').click();

        await expect(page).toHaveURL(/\/dashboard\/index/);
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });
});