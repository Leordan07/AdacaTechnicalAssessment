// This is for the PART 2 of the Technical Interview

import { test, expect } from '@playwright/test';
import { tagWithTimestamp } from '../utils/stringUtils';

test('Login to SauceDemo with Playwright', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Use utility function to tag username (This is for PART 3)
  const username = tagWithTimestamp('standard_user');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Assert successful login
  await expect(page.locator('.inventory_list')).toBeVisible();
});
