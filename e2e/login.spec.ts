// import test, { expect } from "playwright/test";

// test('Logins', async({page}) => {
//     await page.goto('https://tvn24.pl/');
//     await page.locator('#onetrust-accept-btn-handler').click();
//     await page.waitForTimeout(5000);
//     await page.waitForLoadState('domcontentloaded');    
//     await page.locator('button.account-standard__toggle-button').click();
//     await page.getByRole('button', { name: 'Zaloguj się' }).click({force: true});
//     await page.locator('#login_by_email').click();
//     await page.locator('input[name="login"]').fill('test030920241@player.mailinator.com');
//     await page.locator('input[name="password"]').fill('Haslotestowe12!');
//     await page.waitForTimeout(5000);
//     await page.locator('#sign_in').click();
//     await page.waitForTimeout(5000);
//     await expect(page.locator('div.account-standard--authorized')).toBeVisible();
// })