import { By, WebDriver, until } from 'selenium-webdriver';

export class LoginPage {
  private driver: WebDriver;
  private username = By.id('user-name');
  private password = By.id('password');
  private loginButton = By.id('login-button');
  private inventoryContainer = By.id('inventory_container');

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async login(username: string, password: string): Promise<void> {
    await this.driver.findElement(this.username).sendKeys(username);
    await this.driver.findElement(this.password).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
    await this.driver.wait(until.elementLocated(this.inventoryContainer), 5000);
  }
}
