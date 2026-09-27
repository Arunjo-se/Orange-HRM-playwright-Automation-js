// @ts-check
import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import dotenv from "dotenv";
import RandomDataUtils from "../utils/RandomDataUtils";
//const AxeBuilder = require("@axe-core/playwright").default;
import AxeBuilder from "@axe-core/playwright"; // 1

// Load environment variables
dotenv.config();

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.goto();
  });
  test.only("Valid Login Test", async ({ page }) => {
    const login = new loginPage(page);
    await login.loginFunction(
      process.env.AdminUserName ?? "",
      process.env.password ?? "",
    );
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();

    console.log(`Violations: ${results.violations.length}`);

    for (const violation of results.violations) {
      console.log(`\nRule: ${violation.id}`);
      console.log(`Impact: ${violation.impact}`);
      console.log(`Description: ${violation.description}`);

      for (const node of violation.nodes) {
        console.log(`Element: ${node.html}`);
      }
    }
  });
  test("Invalid Login Test", async ({ page }) => {
    const login = new loginPage(page);
    // No need to instantiate RandomDataUtils for static methods
    for (let i = 0; i < 5; i++) {
      await login.loginFunction(
        RandomDataUtils.randomUsername(5),
        RandomDataUtils.randomPassword(8),
      );
      await expect(
        page.locator("//p[text()='Invalid credentials']"),
      ).toHaveText("Invalid credentials");
    }
  });
});
