import { test, expect } from "@playwright/test";
import { ensureLoggedIn } from "../utils/session.js";
import { doLogin } from "../utils/loginUtils.js";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  // If session login fails, fallback to manual login
  await doLogin(page);
});

//----- in this test we will open the leave page. using session login
test("Open Dashboard", async ({ page }) => {
  // This handles login + navigation to dashboard
  //await ensureLoggedIn(page);

  await page.goto(process.env.devURL + "/leave/viewLeaveList", {
    waitUntil: "domcontentloaded",
  });

  console.log("leave opened");

  await page.waitForTimeout(5000);
});
