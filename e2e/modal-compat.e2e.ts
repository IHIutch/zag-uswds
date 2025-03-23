import { test, expect, type Page } from "@playwright/test"


const getTriggerEl = (page: Page) => page.locator('[data-part="modal-trigger"]');
const getContentEl = (page: Page) => page.locator('[data-part="modal-content"]');
const getBackdropEl = (page: Page) => page.locator('[data-part="modal-backdrop"]');
const getPositionerEl = (page: Page) => page.locator('[data-part="modal-positioner"]');
const getTitleEl = (page: Page) => page.locator('[data-part="modal-title"]');
const getDescriptionEl = (page: Page) => page.locator('[data-part="modal-description"]');
const getCloseTriggerEl = (page: Page) => page.locator('[data-part="modal-close-trigger"]');

test.describe('Modal Component Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/modal/")
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })

    // test('Builds the modal HTML', async ({ page }) => {
    //     const modalWrapper = getPositionerEl(page);
    //     const modalWindow = getContentEl(page);
    //     const overlay = getBackdropEl(page);

    //     await expect(modalWrapper).toBeVisible();
    //     await expect(modalWindow).toHaveAttribute('tabindex', '-1');
    //     await expect(modalWrapper).toHaveAttribute('role', 'dialog');
    //     await expect(overlay).toBeVisible();
    // });

    test('Opens the modal when the open button is clicked', async ({ page }) => {
        const triggerEl = getTriggerEl(page);
        const contentEl = getContentEl(page);

        await triggerEl.click();
        await expect(contentEl).toBeVisible();
        await expect(contentEl).toBeFocused();
    });

    test('Closes the modal when the close button is clicked', async ({ page }) => {
        const triggerEl = getTriggerEl(page);
        const contentEl = getContentEl(page);
        const closeTriggerEl = getCloseTriggerEl(page).first();

        await triggerEl.click();
        await closeTriggerEl.click();

        await expect(contentEl).not.toBeVisible();
        await expect(triggerEl).toBeFocused();
    });

    test('Closes the modal when clicking outside modal content', async ({ page }) => {
        const triggerEl = getTriggerEl(page);
        const positionerEl = getPositionerEl(page);
        const contentEl = getContentEl(page);

        await triggerEl.click();
        const box = await positionerEl.boundingBox();

        if (box) {
            await page.mouse.click(box.x - 10, box.y - 10);
        }
        await expect(contentEl).not.toBeVisible();
    });

    test('Restores screen reader visibility for other content when closed', async ({ page }) => {
        const triggerEl = getTriggerEl(page);
        const staysHidden = page.locator('#stays-hidden');
        const closeButton = getCloseTriggerEl(page).first();

        await triggerEl.click();
        await closeButton.click();

        await expect(staysHidden).toHaveAttribute('aria-hidden', 'true');
    });
});