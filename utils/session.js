import fs from "fs";
import path from "path";
import { loginPage } from "../pages/loginPage.js";
import dotenv from "dotenv";

dotenv.config();

const SESSION_FILE = path.join(process.cwd(), "data", "session.json");

function sessionExists() {
  return fs.existsSync(SESSION_FILE);
}

async function saveSession(page) {
  const storage = await page.context().storageState();
  fs.writeFileSync(SESSION_FILE, JSON.stringify(storage, null, 2));
  console.log(`✅ Session saved at ${SESSION_FILE}`);
}

function isSessionDataValid(session) {
  // Validate cookies
  if (!Array.isArray(session.cookies) || session.cookies.length === 0)
    return false;
  for (const cookie of session.cookies) {
    if (!cookie.name || !cookie.value || !cookie.domain) return false;
  }
  // Validate origins/localStorage
  if (!Array.isArray(session.origins)) return false;
  for (const origin of session.origins) {
    if (!origin.origin) return false;
    if (!Array.isArray(origin.localStorage)) return false;
    // Optionally check for required localStorage keys
  }
  return true;
}

export async function ensureLoggedIn(page) {
  const context = page.context();

  if (sessionExists()) {
    try {
      const session = JSON.parse(fs.readFileSync(SESSION_FILE));
      if (!isSessionDataValid(session)) throw new Error("Session data invalid");

      await context.addCookies(session.cookies || []);
      for (const origin of session.origins || []) {
        for (const { name, value } of origin.localStorage || []) {
          await page.addInitScript(
            ([key, val]) => localStorage.setItem(key, val),
            [name, value]
          );
        }
      }

      // Validate session by navigating to a protected page
      //await page.goto(process.env.devURL + "/dashboard/index", {
      //  waitUntil: "domcontentloaded",
      //});
      // Check for a known element that only appears when logged in
      //await page.waitForSelector("h6:has-text('Dashboard')", { timeout: 4000 });
      console.log("✅ Session valid, reusing.");
      return;
    } catch (err) {
      console.log("⚠️ Session invalid or data error, re-logging in...");
      fs.rmSync(SESSION_FILE, { force: true });
    }
  }

  // Fresh login via POM
  const login = new loginPage(page);
  await login.goto();
  await login.loginFunction(process.env.AdminUserName, process.env.password);
  await page.waitForSelector("h6:has-text('Dashboard')", { timeout: 4000 });

  // Save new session
  await saveSession(page);
  console.log("✅ New login successful, session saved.");
}
