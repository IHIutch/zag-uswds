"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const getTriggerEl = (page) => page.locator('[data-part="modal-trigger"]');
const getContentEl = (page) => page.locator('[data-part="modal-content"]');
const getBackdropEl = (page) => page.locator('[data-part="modal-backdrop"]');
const getPositionerEl = (page) => page.locator('[data-part="modal-positioner"]');
const getTitleEl = (page) => page.locator('[data-part="modal-title"]');
const getDescriptionEl = (page) => page.locator('[data-part="modal-description"]');
const getCloseTriggerEl = (page) => page.locator('[data-part="modal-close-trigger"]');
test_1.test.describe('Modal Component Tests', () => {
    test_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.goto("/modal/");
    }));
    test_1.test.afterEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.close();
    }));
    (0, test_1.test)('Opens the modal when the open button is clicked', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const triggerEl = getTriggerEl(page);
        const contentEl = getContentEl(page);
        yield triggerEl.click();
        yield (0, test_1.expect)(contentEl).toBeVisible();
        yield (0, test_1.expect)(contentEl).toBeFocused();
    }));
    (0, test_1.test)('Closes the modal when the close button is clicked', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const triggerEl = getTriggerEl(page);
        const contentEl = getContentEl(page);
        const closeTriggerEl = getCloseTriggerEl(page).first();
        yield triggerEl.click();
        yield closeTriggerEl.click();
        yield (0, test_1.expect)(contentEl).not.toBeVisible();
        yield (0, test_1.expect)(triggerEl).toBeFocused();
    }));
    (0, test_1.test)('Closes the modal when clicking outside modal content', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const triggerEl = getTriggerEl(page);
        const positionerEl = getPositionerEl(page);
        const contentEl = getContentEl(page);
        yield triggerEl.click();
        const box = yield positionerEl.boundingBox();
        if (box) {
            yield page.mouse.click(box.x - 10, box.y - 10);
        }
        yield (0, test_1.expect)(contentEl).not.toBeVisible();
    }));
    (0, test_1.test)('Restores screen reader visibility for other content when closed', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const triggerEl = getTriggerEl(page);
        const staysHidden = page.locator('#stays-hidden');
        const closeButton = getCloseTriggerEl(page).first();
        yield triggerEl.click();
        yield closeButton.click();
        yield (0, test_1.expect)(staysHidden).toHaveAttribute('aria-hidden', 'true');
    }));
});
