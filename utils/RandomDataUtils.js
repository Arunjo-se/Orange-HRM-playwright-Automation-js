/**
 * Utility functions for generating random test data with configurable length.
 */
class RandomDataUtils {
  /**
   * Generate a random string of given length.
   */
  static randomString(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  /**
   * Generate a random number between min and max (inclusive).
   */
  static randomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random number string of given length.
   */
  static randomNumberString(length = 4) {
    const digits = "0123456789";
    return Array.from(
      { length },
      () => digits[Math.floor(Math.random() * digits.length)]
    ).join("");
  }

  static randomEmail(length = 6) {
    return `${this.randomString(length).toLowerCase()}${this.randomNumberString(
      2
    )}@example.com`;
  }

  static randomUsername(length = 8) {
    return `user_${this.randomString(length)}`;
  }

  static randomPassword(length = 10) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  static randomPhoneNumber(length = 10) {
    return this.randomNumberString(length);
  }

  static randomAddress(length = 20) {
    return `${this.randomNumberString(3)} ${this.randomString(length)} Street`;
  }

  /**
   * Generate a random date between start and end, formatted as required.
   * @param {Date} start - Start date (default: Jan 1, 2000)
   * @param {Date} end - End date (default: today)
   * @param {"MM/DD/YYYY"|"DD/MM/YYYY"|"YYYY/MM/DD"} format - Date format
   * @returns {string} - Formatted date string
   */
  static randomDate(
    start = new Date(2000, 0, 1),
    end = new Date(),
    format = "YYYY/MM/DD"
  ) {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    switch (format) {
      case "MM/DD/YYYY":
        return `${mm}/${dd}/${yyyy}`;
      case "DD/MM/YYYY":
        return `${dd}/${mm}/${yyyy}`;
      case "YYYY/MM/DD":
        return `${yyyy}/${mm}/${dd}`;
      default:
        throw new Error(`Unsupported date format: ${format}`);
    }
  }
}

export default RandomDataUtils;
