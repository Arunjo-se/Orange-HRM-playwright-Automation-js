import { test, expect } from "@playwright/test";
import { ensureLoggedIn } from "../utils/session.js";
import dotenv from "dotenv";
dotenv.config();

//----- session login is used here
test("Open Dashboard", async ({ page }) => {
  // This handles login + navigation to dashboard
  await ensureLoggedIn(page);

  await page.goto(process.env.devURL + "/pim/viewEmployeeList", {
    waitUntil: "domcontentloaded",
  });

  console.log("Dashboard opened");

  await page.waitForTimeout(5000);
});
