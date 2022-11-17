const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PurchasePage extends Page {
    /**
     * define selectors using getter methods
     */
    get checkoutBtn() {
        return $("button[data-role='proceed-to-checkout']");
    }

    get emailField() {
        return $("#customer-email-fieldset > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)");
    }

    get firstName() {
        return $("[name='firstname']");
    }

    get lastName() {
        return $("[name='lastname']");
    }

    get streetAddress1() {
        return $("[name='street[0]']");
    }

    get cityField() {
        return $("[name='city']");
    }

    get stateDropdown() {
        return $("[name='region_id']");
    }

    get firstState() {
        return $("[data-title='Alabama']");
    }

    get zipField() {
        return $("[name='postcode']");
    }

    get phoneNumField() {
        return $("[name='telephone']");
    }

    get fixedRateRadio() {
        return $("[value='flatrate_flatrate']");
    }

    get tableRateRadio() {
        return $("[value='tablerate_bestway']");
    }

    get nextBtn() {
        return $(".button.action.continue.primary");
    }

    get shippingMsg() {
        return $("div[role='alert']");
    }

    get FieldError() {
        return $(".field-error");
    }

    get placeOrderBtn() {
        return $("button[title='Place Order']");
    }

    get confirmationText() {
        return $(".page-title");
    }

    get orderNum() {
        return $("[class='order-number']");
    }

    get lastOrder() {
        return $("[data-th='Order #']");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to sign up using required data fields
     */
    async completeShippingSection(email, fname, lname, addr, city, zip, num) {
        await this.emailField.setValue(email);
        await this.firstName.setValue(fname);
        await this.lastName.setValue(lname);
        await this.streetAddress1.setValue(addr);
        await this.cityField.setValue(city);
        await this.stateDropdown.selectByIndex(1);
        await this.zipField.setValue(zip);
        await this.phoneNumField.setValue(num);
        await this.fixedRateRadio.click();
        await this.nextBtn.click();
    }

    async incompleteShippingSection(fname, lname, zip, num) {
        await this.emailField.clearValue();
        await this.firstName.setValue(fname);
        await this.lastName.setValue(lname);
        await this.streetAddress1.clearValue();
        await this.cityField.clearValue();
        await this.stateDropdown.selectByIndex(1);
        await this.zipField.setValue(zip);
        await this.phoneNumField.setValue(num);
        await this.fixedRateRadio.click();
        await this.nextBtn.click();
    }

    async noShippingMethod(email, fname, lname, addr, city, zip, num) {
        await browser.pause(5000);
        await this.emailField.setValue(email);
        await this.firstName.setValue(fname);
        await this.lastName.setValue(lname);
        await this.streetAddress1.setValue(addr);
        await this.cityField.setValue(city);
        await this.stateDropdown.selectByIndex(1);
        await this.zipField.setValue(zip);
        await this.phoneNumField.setValue(num);
        await this.nextBtn.click();
    }

    async authPurchase() {
        await this.fixedRateRadio.click();
        await this.nextBtn.click();
        await browser.pause(5000);
        await this.placeOrderBtn.click();
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open("checkout/");
    }
}

module.exports = new PurchasePage();
