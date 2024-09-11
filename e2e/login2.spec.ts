import test, { expect } from "playwright/test";

test('Logins to tvn24.pl', async({page}) => {
    // Arrange
    test.setTimeout(40 * 1000);
    const delay = 2 * 1000;

    // Act
    await page.goto('https://tvn24.pl/');
    await page.getByRole('button', { name: 'Akceptuję' } ).click( { delay: 0 });

    const iframe = await page.frameLocator('iframe.__ipPerunElement');
    await iframe.locator('.no-box .__ipPopupClose').click();

    await page.waitForURL('https://tvn24.pl/');

    await page.pause();
    
    await page.getByRole('button', { name: 'Zarządzanie kontem' } ).hover( { timeout: delay });
    // alternative that also works
    // await page.getByRole('button', { name: 'Zarządzanie kontem' } ).click( { delay: delay, trial: true });
    await page.getByRole('button', { name: 'Zaloguj się' } ).click( { delay:  0 });
    

    await page.waitForURL('https://account.tvn.pl/auth/login**');    
    await page.getByRole('button', { name: 'Log in by e-mail' } ).click( { delay: 0 });
    await page.getByRole('textbox', { name: 'E-mail' } ).fill('beth.walker@ethereal.email');
    await page.getByRole('textbox', { name: 'Password' } ).fill('8x6rRwgYa2194TfUNW');
    
    await page.getByText('Preparing the captcha').waitFor({ state: 'detached' });

    const waitForFinishedOrTimeout = Promise.race([
        page.getByText('Finished').waitFor({ state: 'detached' }),
        page.waitForTimeout(delay)
    ]);    
    await waitForFinishedOrTimeout;
    
    await page.getByRole('button', { name: 'Sign in' } ).click();

    await page.waitForURL('https://tvn24.pl/');
    await page.waitForSelector('div.account-standard--authorized');
    await page.getByRole('button', { name: 'Zarządzanie kontem' } ).hover( { timeout: delay, trial: true });

    // Assert
    await expect(page.locator('div.account-standard--authorized')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Wyloguj się' } )).toBeVisible();
    await expect(page.locator('span.account-content__text')).toBeVisible();
    await expect(page.locator('span.account-content__text')).toHaveText('Beth');
})