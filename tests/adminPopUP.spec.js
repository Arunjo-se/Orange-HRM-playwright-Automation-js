import { test, expect } from "@playwright/test";
import { doLogin } from "../utils/loginUtils.js";
import { AdminUsermangment } from "../pages/adminUsermangment.js";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  // If session login fails, fallback to manual login
  await doLogin(page);
});

test("Admin page", async ({ page }) => {
  const adminUsermangment = new AdminUsermangment(page);

  await adminUsermangment.clickAdmin();

  await adminUsermangment.clickPopUp();

  // popup handling code if any is there. This is the normal way to handle popups.

  // page.on('dialog', async dialog => {
  //   console.log(dialog.message());
  //   await dialog.accept();      // or dialog.dismiss()
  // });

  await page.waitForTimeout(2000);
  await adminUsermangment.popupTestCase(true); // true for yes, false for no

  await page.waitForTimeout(5000);
});
