// @ts-check
import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import dotenv from "dotenv";

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
    //await expect(page).toHaveURL("/dashboard");
  });
  test("Invalid Login Test", async ({ page }) => {
    const login = new loginPage(page);
    await login.loginFunction("invalidUser", "invalidPass");
    await expect(page.locator("//p[text()='Invalid credentials']")).toHaveText(
      "Invalid credentials"
    );
  });
});
