const signUpPage = require("../pageObjects/signUp.page");
const { faker } = require("@faker-js/faker");
const signUpData = require("../data/signUpData");

describe("User Registration", () => {
  it("should attempt to sign up, using an invalid email", async () => {
    await signUpPage.open();

    const fullName = faker.name.fullName();
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];

    const email = signUpData.invalidEmail;

    const password = faker.internet.password(20);
    console.log("This is the email: ", email, "\n", "This is the password: ", password);

    await signUpPage.completeSignUp(firstName, lastName, email, password, password);
    await expect(browser).toHaveUrl(signUpData.createPage);
    await expect(signUpPage.invalidEmailError).toBeDisplayed();
    await expect(signUpPage.invalidEmailError).toHaveText(signUpData.emailError);
  });

  it("should not complete a successful sign up, with a missing field", async () => {
    await signUpPage.open();

    const fullName = faker.name.fullName();
    const firstName = fullName.split(" ")[0];

    //append a random number to email to lessen of creating an email already in use
    const email =
      String(Math.floor(Math.random() * 999)) + faker.internet.email(firstName);

    const password = faker.internet.password(20);
    console.log("This is the email: ", email, "\n", "This is the password: ", password);

    await signUpPage.missingFieldSignUp(firstName, email, password, password);
    await expect(browser).toHaveUrl(signUpData.createPage);
    await expect(signUpPage.formError).toBeDisplayed();
  });


  it("should complete a successful sign up, using all fields", async () => {
    await signUpPage.open();

    const fullName = faker.name.fullName();
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];

    //append a random number to email to lessen chance of creating an email already in use
    const email =
      String(Math.floor(Math.random() * 999)) +
      faker.internet.email(lastName, firstName);

    const password = faker.internet.password(20);
    console.log(
      "This is the email: ", email, "\n", "This is the password: ", password);

    await signUpPage.completeSignUp(firstName, lastName, email, password, password);
    await expect(browser).toHaveUrl(signUpData.accountPage);
    await expect(signUpPage.successField).toHaveText(signUpData.successMsg);
  });

});
