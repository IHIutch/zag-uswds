import { test, expect } from '@playwright/test';


test.describe('Modal Compat Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/modal")
    })

    test('should render modal correctly', async ({ page }) => {
        const modal = page.locator('[data-testid="modal"]');
        await expect(modal).toBeVisible();
    });

    test('should close modal on dismiss', async ({ page }) => {
        const closeButton = page.locator('[data-testid="modal-close"]');
        await closeButton.click();
        const modal = page.locator('[data-testid="modal"]');
        await expect(modal).not.toBeVisible();
    });
});
