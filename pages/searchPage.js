const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

//EXPEDITION DOWN LITE JACKET W
class SearchPage extends BasePage {
  static PAGE_URL = "https://www.fjallraven.com/eu/en-gb";
  static SEARCH_LINK_XPATH = `//*[@id="root"]/div/header/div/nav/a`;
  static SEARCH_INPUT_XPATH = `/html/body/div[1]/div/div[3]/div/form/input`;
  static NO_RESULT_MESSAGE_XPATH = `/html/body/div[1]/div/div[8]/main/div[1]/div[1]/h1`;
  static RESULTS_XPATH = `/html/body/div[1]/div/main/div/div/div[2]/div[1]/div[1]/div/span[2]`;

  openPage = async () => super.openPage(SearchPage.PAGE_URL);
  
  async clickSearchButton() {
    logger.info("Clicking search button to see search input");
    const element = await this.findByXpath(SearchPage.SEARCH_LINK_XPATH);
    await element.click();

    return this;
  }

  async enterProductName(productToSearch) {
    logger.info("Entering '" + productToSearch + "' and click enter");
    const element = await this.findByXpath(SearchPage.SEARCH_INPUT_XPATH);
    await element.sendKeys(productToSearch, Key.ENTER);

    return this;
  }

  async getNoResultsMessage() {
    logger.info("Checking no result message");
    const element = await this.findByXpath(SearchPage.NO_RESULT_MESSAGE_XPATH);

    return element.getText();
  }

  async getNumberOfResults() {
    logger.info("Getting number of results");
    const element = await this.findByXpath(SearchPage.RESULTS_XPATH);
    const number = await element.getText();
    return Number.parseInt(number);
  }
}

module.exports = SearchPage;
