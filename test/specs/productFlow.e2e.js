const ProductPage = require("../pageObjects/addToCartFlow.page");
const productData = require("../data/productData");
const PurchasePage = require("../pageObjects/purchaseProductFlow.page");
const LoginPage = require("../pageObjects/loginPage.page");
const signUpData = require("../data/signUpData");

const { faker } = require("@faker-js/faker");


//add to cart section
describe("Add to cart", () => {
  before(function () {
    browser.maximizeWindow();
  });

  it("should not add an item with no size selected", async () => {
    await ProductPage.open();

    await ProductPage.addTeeNoSize();
    await expect(ProductPage.sizeError).toBeDisplayed();
    await expect(ProductPage.sizeError).toHaveText(productData.missingField);
  });

  it("should not add an item with no color selected", async () => {
    await ProductPage.open();

    await ProductPage.addTeeNoColor();
    await expect(ProductPage.colorError).toBeDisplayed();
    await expect(ProductPage.colorError).toHaveText(productData.missingField);
  });

  it("should not add an item with a quantity of zero", async () => {
    await ProductPage.open();

    await ProductPage.addZeroQtyTee();
    await expect(ProductPage.qtyError).toBeDisplayed();
    await expect(ProductPage.qtyError).toHaveText(productData.qtyMsg);
  });

  it("should add radiant tee to cart", async () => {
    await ProductPage.open();

    await ProductPage.addTeeToCart();
    await browser.pause(5000);
    await expect(ProductPage.successMsg).toBeDisplayed();
    await expect(ProductPage.successMsg).toHaveText(productData.successMsg);
  });

});

//Purchase product section
describe("Purchase product added to cart", () => {
  it("should not complete shipping section without a selected Shipping method", async () => {
    await PurchasePage.open();

    const fullName = faker.name.fullName();
    const fname = fullName.split(" ")[0];
    const lname = fullName.split(" ")[1];
    const addr = faker.address.streetAddress();
    const num = faker.phone.number();
    const city = faker.address.city();
    const zip = faker.address.zipCode();

    //append a random number to email to lessen chance of creating an email already in use
    const email =
      String(Math.floor(Math.random() * 999)) +
      faker.internet.email(lname, fname);

    console.log("This is the email: ", email);

    await PurchasePage.noShippingMethod(email, fname, lname, addr, city, zip, num);
    await expect(PurchasePage.shippingMsg).toBeDisplayed();
    await expect(PurchasePage.shippingMsg).toHaveText(productData.shippingMsg);

  });

  it("should not complete shipping section with a missing required field", async () => {
    await PurchasePage.open();

    const fullName = faker.name.fullName();
    const fname = fullName.split(" ")[0];
    const lname = fullName.split(" ")[1];
    const num = faker.phone.number();
    const zip = faker.address.zipCode();

    await PurchasePage.incompleteShippingSection(fname, lname, zip, num);
    await expect(PurchasePage.FieldError).toBeDisplayed();
    await expect(PurchasePage.FieldError).toHaveText(productData.missingField);

  });


  it("should complete shipping section", async () => {
    await PurchasePage.open();

    const fullName = faker.name.fullName();
    const fname = fullName.split(" ")[0];
    const lname = fullName.split(" ")[1];
    const addr = faker.address.streetAddress();
    const num = faker.phone.number();
    const city = faker.address.city();
    const zip = faker.address.zipCode();

    //append a random number to email to lessen chance of creating an email already in use
    const email =
      String(Math.floor(Math.random() * 999)) +
      faker.internet.email(lname, fname);

    console.log("This is the email: ", email);

    await PurchasePage.completeShippingSection(email, fname, lname, addr, city, zip, num);
    await expect(browser).toHaveUrl(productData.paymentPage);
  });

  //log in for auth purchase
  it("should log in test user", async () => {
    await LoginPage.open();
    await LoginPage.login(signUpData.email, signUpData.password);
    await expect(browser).toHaveUrl(signUpData.accountPage);
  });

  it("should complete a purchase as an authenticated user", async () => {
    //begin purchase flow
    await PurchasePage.open();
    await PurchasePage.authPurchase();
    orderNum = await PurchasePage.orderNum.getText(); //save order number for verification below
    await expect(browser).toHaveUrl(productData.confirmationPage)
    await expect(PurchasePage.confirmationText).toHaveText(productData.confirmationMsg);

    //Should verify last purchase in order history"
    //Head directly to order history page
    await browser.url("https://magento.softwaretestingboard.com/sales/order/history/");
    await expect(PurchasePage.lastOrder).toHaveText(orderNum);

  });

});
