import { test, expect } from "@playwright/test";
import { ensureLoggedIn } from "../utils/session.js";
import dotenv from "dotenv";
dotenv.config();

test("Open Dashboard", async ({ page }) => {
  // This handles login + navigation to dashboard
  await ensureLoggedIn(page);

  await page.goto(process.env.devURL + "/pim/viewEmployeeList", {
    waitUntil: "domcontentloaded",
  });
  // // ✅ No need to navigate again, just assert
  // await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  // // Interact further
  // await page.locator("//span[text()='Admin']").click();

  await page.waitForTimeout(5000);
});
