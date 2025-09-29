export class AdminUsermangment {
  constructor(page) {
    this.page = page;

    this.admin = page.locator('//span[text()="Admin"]');
    this.popup0 = page.locator(
      '(//div[@class="oxd-table-cell oxd-padding-cell"]//div//button[@type="button"])[3]'
    );

    this.popup1 = page.locator('//div[@role="document"]');
    this.cancelButton = page.getByRole("button", { name: " No, Cancel " });
    this.yesButton = page.getByRole("button", { name: " Yes, Delete " });
    this.closeButton = page.locator(
      '//div[@role="document"]//button[text()="×"]'
    );
  }

  async clickAdmin() {
    await this.admin.click(); // Click on Admin section
  }

  async clickPopUp() {
    await this.popup0.click(); // Click to trigger the popup
  }

  async popupTestCase(confirm = true) {
    if (confirm) {
      await this.yesButton.click();
    } else {
      await this.cancelButton.click();
    }

    await this.popup1.waitFor({ state: "detached" }); // ensure popup closes
  }
}
