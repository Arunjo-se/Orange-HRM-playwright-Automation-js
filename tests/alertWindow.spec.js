import { test, expect } from "@playwright/test";
import { doLogin } from "../utils/loginUtils.js";
import { AdminUsermangment } from "../pages/adminUsermangment.js";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  await doLogin(page);
});

test("Admin page", async ({ page }) => {
  const adminUsermangment = new AdminUsermangment(page);

  await adminUsermangment.clickAdmin();

  await page.waitForTimeout(2000);

  // Register dialog handler BEFORE triggering the popup. this secction only works for alert, prompt, confirm type popups.
  // not working for html modal popups.

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert");
    console.log(dialog.message());
    console.log("popup type  :----- " + dialog.type());
    await dialog.accept(); // or dialog.dismiss()
  });
  await page.waitForTimeout(5000);

  await page.evaluate(() => alert("Test alert!"));

  await page.waitForTimeout(5000);
});
