const AxeBuilder = require("@axe-core/playwright").default;
//import AxeBuilder from "@axe-core/playwright"; // 1

import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import dotenv from "dotenv";
import RandomDataUtils from "../utils/RandomDataUtils";
dotenv.config();

// what is the use of AxeBuiler:-  Accessibility testing checks things like:
/*
👁️ Visual disabilities: Can someone using a screen reader understand what the button does?
⌨️ Motor disabilities: Can someone navigate to and click the button using only a keyboard?
🎨 Color vision: Is the button distinguishable without relying only on color?
🔊 Hearing disabilities: If there's a video, are captions available?
🧠 Cognitive disabilities: Are the instructions clear and easy to understand?

WCAG is based on four principles:

| Principle          | Meaning                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| **Perceivable**    | Users must be able to perceive the information                         |
| **Operable**       | Users must be able to operate the interface                            |
| **Understandable** | Content and controls should be understandable                          |
| **Robust**         | Content should work with different browsers and assistive technologies |

*/

test.beforeEach(async ({ page }) => {
  const login = new loginPage(page);
  await login.goto();
});

test("Check accessibility", async ({ page }) => {
  const login = new loginPage(page);
  await login.loginFunction(
    process.env.AdminUserName ?? "",
    process.env.password ?? "",
  );
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

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
