const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

class ProductPage extends BasePage {
  static PAGE_URL = "https://www.fjallraven.com/eu/en-gb/men/jackets/winter-jackets/expedition-pack-down-hoodie-m?v=F86121%3a%3a7323450796235";
  static COLOR_SPAN_XPATH = `//*[@id="product-details"]/div/div/div[2]/div[1]/div[3]/div[1]/div/a[7]/span[2]/span[1]`;
  static SIZE_BUTTON_XPATH = `//*[@id="product-details"]/div/div/div[2]/div[1]/div[3]/div[2]/div[2]/button[2]`;
  static ADD_TO_CART_BUTTON_XPATH = `//*[@id="add-to-cart-button"]`;
  static CART_BUTTON_XPATH = `//*[@id="mini-cart-header"]/span`;
  static PRODUCTS_NAME_XPATH = `//*[@id="product-details"]/div/div/div[2]/div[1]/div[2]/h1`
  static PRODUCT_PRICE_XPATH = `//*[@id="mini-cart"]/div/dl/dd[3]`

  openPage = async () => super.openPage(ProductPage.PAGE_URL);
  
  async chooseColor() {
    logger.info("Choosing color of the product");
    const element = await this.findByXpath(ProductPage.COLOR_SPAN_XPATH);
    await element.click();

    return this;
  }

  async chooseSize() {
    logger.info("Choosing size of the product");
    const element = await this.findByXpath(ProductPage.SIZE_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async clickAddButton() {
    logger.info("Adding product to the bag");
    const element = await this.findByXpath(ProductPage.ADD_TO_CART_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async goToTheBag() {
    logger.info("Opening bag page");
    const element = await this.findByXpath(ProductPage.CART_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async getProductName(){
    const element = await this.findByXpath(ProductPage.PRODUCTS_NAME_XPATH);
    return element.getText();
  }

  async getProductPrice(){
    const element = await this.findByXpath(ProductPage.PRODUCT_PRICE_XPATH);
    console.log(await element.getText(), 'loooool')
    const text = await element.getText();
    console.log(text.split(" ")[0])
    return text.split(" ")[0];
  }

}

module.exports = ProductPage;
