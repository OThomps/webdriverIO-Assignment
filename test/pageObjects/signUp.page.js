const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignUpPage extends Page {
  /**
   * define selectors using getter methods
   */
  get firstNameField() {
    return $("#firstname");
  }

  get lastNameField() {
    return $("#lastname");
  }

  get newsletterCheckBox() {
    return $("#is_subscribed");
  }

  get emailField() {
    return $("#email_address");
  }

  get passwordField() {
    return $("#password");
  }

  get confirmPasswordField() {
    return $("#password-confirmation");
  }

  get createButton() {
    return $(".submit");
  }

  get formError() {
    return $("fieldset.create.account");
  }

  get invalidEmailError() {
    return $("#email_address-error");
  }

  get emailTakenError() {
    return $(".message-error > div:nth-child(1)");
  }

  get successField() {
    return $(".page.messages");
  }

  get actionSwitch() {
    return $("button[data-action='customer-menu-toggle']");
  }

  get signOutOption() {
    return $("li[class='authorization-link']");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to sign up using required data fields
   */
  async completeSignUp(
    firsName,
    lastName,
    email,
    password,
    passwordConfirmation
  ) {
    await this.firstNameField.setValue(firsName);
    await this.lastNameField.setValue(lastName);
    await this.newsletterCheckBox.click();
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.confirmPasswordField.setValue(passwordConfirmation);
    await this.createButton.click();
  }

  async missingFieldSignUp(firsName, email, password, passwordConfirmation) {
    await this.firstNameField.setValue(firsName);
    await this.newsletterCheckBox.click();
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.confirmPasswordField.setValue(passwordConfirmation);
    await this.createButton.click();
  }

  async logOut() {
    await this.actionSwitch.click();
    await this.signOutOption.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("customer/account/create/");
  }
}

module.exports = new SignUpPage();
