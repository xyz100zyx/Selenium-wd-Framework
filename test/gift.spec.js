const { expect } = require('chai');
const Driver = require("../driver/Driver");
const DataReaderService = require("../services/dataReader.service");
const GiftPage = require("../pages/giftPage");
const Constants = require("../config/constants");

describe("Search any store", () => {
  before(async function () {
    const props = await DataReaderService.getTestData('gift.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it("Is correct design color chosen equals to user's choise", async function () {
    const giftPage = new GiftPage(this.driver);
    await giftPage.openPage();
    await giftPage.selectDesign("light blue");
    await giftPage.selectAmount(50);
    await giftPage.fillName();
    await giftPage.fillSurname();
    await giftPage.fillEmail();
    await giftPage.onAddToCartClick();
    expect(await giftPage.getGiftColorDesign()).to.equal("Blue");
  }).timeout(Constants.TEST_TIMEOUT);

  it("Is correct euro amount equals to user's choise", async function () {
     const giftPage = new GiftPage(this.driver);
     await giftPage.openPage();
     await giftPage.selectDesign("light blue");
     await giftPage.selectAmount("50");
     await giftPage.fillName();
     await giftPage.fillSurname();
     await giftPage.fillEmail();
     await giftPage.onAddToCartClick();
     expect(await giftPage.getGiftAmount()).to.equal("50");
   }).timeout(Constants.TEST_TIMEOUT);

  afterEach(async function () {
    await this.driver.quit();
  });
});
