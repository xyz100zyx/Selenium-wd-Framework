const { expect } = require('chai');
const Driver = require("../driver/Driver");
const DataReaderService = require("../services/dataReader.service");
const SearchPage = require("../pages/SearchPage");
const Constants = require("../config/constants");

describe("Search any product", () => {
  before(async function () {
    const props = await DataReaderService.getTestData('search.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it("Search 'loooooooooool' product", async function () {
    const searchPage = new SearchPage(this.driver);
    await searchPage.openPage();
    await searchPage.clickSearchButton();
    await searchPage.enterProductName(this.invalidSearchQuery);
    expect(await searchPage.getNoResultsMessage()).to.contain("Your search did not match any results.")
  }).timeout(Constants.TEST_TIMEOUT);

  it("Search 'EXPEDITION DOWN LITE JACKET W' product", async function () {
    const searchPage = new SearchPage(this.driver);
    await searchPage.openPage();
    await searchPage.clickSearchButton();
    await searchPage.enterProductName(this.validSearchQuery);
    expect(await searchPage.getNumberOfResults()).to.be.greaterThan(0);
  }).timeout(Constants.TEST_TIMEOUT);

  afterEach(async function () {
    await this.driver.quit();
  });
});
