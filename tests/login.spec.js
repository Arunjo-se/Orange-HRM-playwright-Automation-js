// @ts-check
import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import dotenv from "dotenv";
import RandomDataUtils from "../utils/RandomDataUtils";

// Load environment variables
dotenv.config();

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.goto();
  });
  test("Valid Login Test", async ({ page }) => {
    const login = new loginPage(page);
    await login.loginFunction(
      process.env.AdminUserName ?? "",
      process.env.password ?? ""
    );
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  });
  test("Invalid Login Test", async ({ page }) => {
    const login = new loginPage(page);
    // No need to instantiate RandomDataUtils for static methods
    for (let i = 0; i < 5; i++) {
      await login.loginFunction(
        RandomDataUtils.randomUsername(5),
        RandomDataUtils.randomPassword(8)
      );
      await expect(
        page.locator("//p[text()='Invalid credentials']")
      ).toHaveText("Invalid credentials");
    }
  });
});
