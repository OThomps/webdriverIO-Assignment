const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
  /**
   * define selectors using getter methods
   */
  get radiantTee() {
    return $("li.product-item:nth-child(1)");
  }

  get sizeXS() {
    return $("#option-label-size-143-item-166");
  }

  get colorBlue() {
    return $("#option-label-color-93-item-50");
  }

  get qtyField() {
    return $("#qty");
  }

  get passwordField() {
    return $("#password");
  }

  get confirmPasswordField() {
    return $("#password-confirmation");
  }

  get addToCartButton() {
    return $("#product-addtocart-button");
  }

  get qtyError() {
    return $("#qty-error");
  }

  get colorError() {
    return $("[for='super_attribute[93]']");
  }

  get sizeError() {
    return $("[for='super_attribute[143]']");
  }

  get successMsg() {
    return $(".message-success");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to sign up using required data fields
   */
  async addTeeToCart() {
    await this.radiantTee.click();
    await this.sizeXS.click();
    await this.colorBlue.click();
    await this.addToCartButton.click();
  }

  async addZeroQtyTee() {
    await this.radiantTee.click();
    await this.sizeXS.click();
    await this.colorBlue.click();
    await this.qtyField.setValue(0);
    await this.addToCartButton.click();
  }

  async addTeeNoColor() {
    await this.radiantTee.click();
    await this.sizeXS.click();
    await this.addToCartButton.click();
  }

  async addTeeNoSize() {
    await this.radiantTee.click();
    await this.colorBlue.click();
    await this.addToCartButton.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("");
  }
}

module.exports = new ProductPage();
