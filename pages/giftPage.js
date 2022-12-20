const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

class GiftPage extends BasePage {
    static PAGE_URL = "https://www.fjallraven.com/eu/en-gb/gift-card/fjallraven-digital-gift-card";
    static LIST_DESIGN_XPATH = `//*[@id="product-details"]/div/div/div[2]/div/div[2]/div[1]/div[2]`
    static LIST_AMOUNT_XPATH = `//*[@id="product-details"]/div/div/div[2]/div/div[2]/div[2]/div[2]`
    static NAME_INPUT_XPATH = `//*[@id="product-details"]/div/div/div[2]/div/div[2]/div[3]/div[2]/div[1]/input`
    static SURNAME_INPUT_XPATH = `//*[@id="product-details"]/div/div/div[2]/div/div[2]/div[3]/div[2]/div[2]/input`
    static EMAIL_INPUT_XPATH = `//*[@id="product-details"]/div/div/div[2]/div/div[2]/div[3]/div[3]/input`
    static ADD_BUTTON_XPATH = `//*[@id="add-to-cart-button"]`
    static RESULT_COLOR_XPATH = `/html/body/div[1]/div/div[4]/div/div[1]/div/ul/li/div[2]/div[1]/div/div/span`
    static RESULT_AMOUNT_XPATH = `/html/body/div[1]/div/div[4]/div/div[1]/div/ul/li/div[2]/div[1]/span`

    design = {
        "black": 1,
        "light blue": 2,
        "dark blue": 3,
        "red": 4,
        "yellow": 5,
    }

    euroAmount = {
        "25": 1,
        "50": 2,
        "75": 3,
        "150": 4,
        "200": 5,
        "250": 6,
    }

    static user = {
        name: 'Artyom',
        surname: 'Karpinchick',
        email: 'xyz321@mail.ru'
    };

    openPage = async () => super.openPage(GiftPage.PAGE_URL);

    async selectDesign(color) {
        logger.info("Selecting " + color + " design at gift card");
        const button = await this.findByXpath(GiftPage.LIST_DESIGN_XPATH + "/button" + `[${(this.design[color] ?? 1)}]`);
        await button.click();

        return this;
    }

    async selectAmount(amount) {
        logger.info("Selecting " + amount + " amount at gift card");
        const button = await this.findByXpath(GiftPage.LIST_AMOUNT_XPATH + "/button" + `[${(this.euroAmount[String(amount)] ?? 1)}]`);
        await button.click();

        return this;
    }

    async fillName(){
        logger.info("Filling the username input");
        const input = await this.findByXpath(GiftPage.NAME_INPUT_XPATH);
        await input.sendKeys(GiftPage.user.name)

        return this;
    }

    async fillSurname(){
        logger.info("Filling the surname input");
        const input = await this.findByXpath(GiftPage.SURNAME_INPUT_XPATH);
        await input.sendKeys(GiftPage.user.surname)

        return this;
    }

    async fillEmail(){
        logger.info("Filling the email input");
        const input = await this.findByXpath(GiftPage.EMAIL_INPUT_XPATH);
        await input.sendKeys(GiftPage.user.email)

        return this;
    }

    async onAddToCartClick() {
        logger.info("Clicking add to cart button");
        const button = await this.findByXpath(GiftPage.ADD_BUTTON_XPATH);
        await button.click();

        return this;
    }

    async getGiftColorDesign(){
        logger.info("Check the result color of gift card in cart");
        const element = await this.findByXpath(GiftPage.RESULT_COLOR_XPATH);
        const colorText = await element.getText();
        console.log(colorText, colorText);
        const color = colorText.split("-")[2];

        return color.slice(1);
    }

    async getGiftAmount(){
        logger.info("Check the result amount of gift card in cart");
        const element = await this.findByXpath(GiftPage.RESULT_AMOUNT_XPATH);
        const amountArray = await element.getText();
        const amount = amountArray.split(" ")[0];
        console.log("AMOOOOUNT", amount)

        return amount;
    }
}

module.exports = GiftPage;