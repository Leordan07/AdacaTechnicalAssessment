import { By, WebDriver, until } from 'selenium-webdriver';

export class CartPage {
  private driver: WebDriver;
  private username = By.id('user-name');
  private password = By.id('password');
  private loginButton = By.id('login-button');
  private inventoryContainer = By.id('inventory_container');
  private products = By.className("btn btn_primary btn_small btn_inventory");
  public cartBadge = By.className('shopping_cart_badge')
  private removeButton = By.className('btn btn_secondary btn_small cart_button')

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async login(username: string, password: string): Promise<void> {
    await this.driver.findElement(this.username).sendKeys(username);
    await this.driver.findElement(this.password).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
    await this.driver.wait(until.elementLocated(this.inventoryContainer), 5000);
  }

  async addItem() {
    const productButtons = await this.driver.findElements(this.products);
    if (productButtons.length > 0) {
        await productButtons[0].click();
    }
  }

  async addAllItems() {
    const productButtons = await this.driver.findElements(this.products);
    for (const button of productButtons) {
        await button.click();
    }
  }

  async removeItem() {
    await this.driver.findElement(this.removeButton).click();
  }
}
