const { expect } = require('chai');
const Driver = require("../driver/Driver");
const DataReaderService = require("../services/dataReader.service");
const ProductPage = require("../pages/productPage");
const Constants = require("../config/constants");

describe("Adding an item to the bag", () => {
  before(async function () {
    const props = await DataReaderService.getTestData('info.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it("Product name shown correct in the bag", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage();
    await productPage.chooseColor()
    await productPage.chooseSize()
    await productPage.clickAddButton();
    expect(await productPage.getProductName()).to.be.equal(this.productNameToEqual);
  }).timeout(Constants.TEST_TIMEOUT);

  it("Product price shown correct in the bag", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage();
    await productPage.chooseColor()
    await productPage.chooseSize()
    await productPage.clickAddButton();
    expect(await productPage.getProductPrice()).to.be.equal("319,95");
  }).timeout(Constants.TEST_TIMEOUT);

  afterEach(async function () {
    await this.driver.quit();
  });
});
