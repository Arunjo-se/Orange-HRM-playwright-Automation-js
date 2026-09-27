import { test, expect } from "@playwright/test";
import { doLogin } from "../utils/loginUtils.js";
import { AdminUsermangment } from "../pages/adminUsermangment.js";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  await doLogin(page);
});

test.skip("Admin page popup (html modal)", async ({ page }) => {
  const adminUsermangment = new AdminUsermangment(page);

  await adminUsermangment.clickAdmin();
  await adminUsermangment.clickPopUp();
  await page.waitForTimeout(2000);

  page.pause();
  await adminUsermangment.clickPopUp();

  await adminUsermangment.popupTestCase(true); // true for yes, false for no

  await page.waitForTimeout(5000);
});

test("Admin page popup (alert)", async ({ page }) => {
  const adminUsermangment = new AdminUsermangment(page);
  await adminUsermangment.clickAdmin();
  await page.waitForTimeout(2000);

  await page
    .locator(
      '(//div[@class="oxd-table-cell oxd-padding-cell"]//div//button[@type="button"])[1]'
    )
    .click();
  await page.waitForTimeout(5000);

  // Wait for the custom modal to appear
  const modal = page.locator(".oxd-dialog-container, .modal-content"); // adjust selector as needed
  await expect(modal).toBeVisible({ timeout: 5000 });

  const popup = modal.getByText("Cannot be deleted");
  await expect(popup).toBeVisible({ timeout: 2000 });

  const text = await popup.textContent();
  console.log("Popup text content: ", text);

  // await page.addLocatorHandler(
  //   page.getByText("Cannot be deleted"),
  //   async (locator) => {
  //     console.log("Custom handler for 'Cannot be deleted' text triggered!");
  //     await expect(locator).toBeVisible();
  //     const text = await locator.textContent();
  //     console.log("Popup text content: ", text);
  //     // Add any additional assertions or actions here
  //   }
  // );
});
