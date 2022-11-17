const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */

   get emailField() {
    return $("#email");
  }

   get passwordField() {
    return $("[name='login[password]']");
  }

  get loginBtn() {
    return $("button.login");
  }


  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to sign up using required data fields
   */
  async login(email, pwd) {
    await this.emailField.setValue(email);
    await this.passwordField.setValue(pwd);
    await this.loginBtn.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("customer/account/login/");
  }
}

module.exports = new LoginPage();
