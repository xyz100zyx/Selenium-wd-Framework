const { By, until } = require("selenium-webdriver");
const logger = require("../logger");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    logger.info('Opening the page: ' + url);
    await this.driver.get(url);
    await this.closeSidebar();

    return this;
  }

  async findByXpath(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
  }

  async findElementsByXpath(xpath) {
    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), 5000);
  }

  async closeSidebar(){
    const element = await this.findByXpath(`/html/body/section/div/div/div[3]/div[2]/button[2]`);
    await element.click();
    console.log('element', element);
    return this;
  }
}

module.exports = BasePage;
