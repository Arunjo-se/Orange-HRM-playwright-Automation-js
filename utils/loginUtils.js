import { loginPage } from "../pages/loginPage.js";
import dotenv from "dotenv";
dotenv.config();

export async function doLogin(
  page,
  username = process.env.AdminUserName,
  password = process.env.password
) {
  const login = new loginPage(page);
  await login.goto();
  await login.loginFunction(username, password);
}
