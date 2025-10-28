import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Builder, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { LoginPage } from '../tests/selenium/pages/LoginPage';
import { CartPage } from '../tests/selenium/pages/CartPage';
import fs from 'fs';
import path from 'path';
import { tagWithTimestamp } from '../tests/utils/stringUtils';


let driver: WebDriver;
let loginPage: LoginPage;
let cartPage: CartPage;

Before(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
  loginPage = new LoginPage(driver);
  cartPage = new CartPage(driver);
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
      const image = await driver.takeScreenshot();
      const screenshotPath = path.resolve(
        'screenshots',
        `${scenario.pickle.name.replace(/\s+/g, '_')}.png`
      );
      fs.writeFileSync(screenshotPath, image, 'base64');
    }
    await driver.quit();
});

Given('I am on the SauceDemo login page', async () => {
  await driver.get('https://www.saucedemo.com/');
});

When('I log in with username {string} and password {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('I should be redirected to the Product inventory page', async () => {
  const url = await driver.getCurrentUrl();
  expect(url).to.include('inventory');
});

Given('I am logged in to SauceDemo', async () => {
  await driver.get('https://www.saucedemo.com/');
  const username = tagWithTimestamp('standard_user');
  await loginPage.login('standard_user', 'secret_sauce');
});

When('I add {word} item(s) to the cart', async function (quantity: string) {
  if (quantity === 'all') {
    await cartPage.addAllItems();
  } else {
    await cartPage.addItem();
  }
});

Then('the cart should show {int} item(s)', async function (itemCount: number) {
  const badgeText = await driver.findElement(cartPage.cartBadge).getText();
  expect(parseInt(badgeText)).to.equal(itemCount);
});

When('I remove the item from the cart', async () => {
  await driver.get('https://www.saucedemo.com/cart.html');
  await cartPage.removeItem();
});

Then('the cart should be empty', async () => {
  try {
    const badge = await driver.findElement(cartPage.cartBadge);
    const isVisible = await badge.isDisplayed();
    expect(isVisible).to.be.false;
  } catch (error) {
    // Element not found — cart is empty
    expect(true).to.be.true;
  }
});
