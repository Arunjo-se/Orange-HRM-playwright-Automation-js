import { test, expect } from "@playwright/test";
import { ensureLoggedIn } from "../utils/session.js";
import dotenv from "dotenv";
dotenv.config();

test("Open Dashboard", async ({ page }) => {
  // This handles login + navigation to dashboard
  await ensureLoggedIn(page);

  await page.goto(process.env.devURL + "/leave/viewLeaveList", {
    waitUntil: "domcontentloaded",
  });


  await page.waitForTimeout(5000);
});
