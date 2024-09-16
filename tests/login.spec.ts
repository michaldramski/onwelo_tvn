import { test, expect } from '@playwright/test';
import { DefaultUser } from '../test-data/test-users';
import NewsPage from '../pages/news.page';

test('Logins to tvn24.pl', { tag: ['@smoke'] }, async ({ page }) => {
    // Arrange
    test.setTimeout(40 * 1000);
    const delay = 2 * 1000;
    const newsPage = new NewsPage(page);

    // Act
    newsPage.open();
    newsPage.closeCookiesPopup();
    newsPage.closeNotificationPopup();

    await page.waitForURL('https://tvn24.pl/');

    await page
        .getByRole('button', { name: 'Zarządzanie kontem' })
        .hover({ timeout: delay });
    // alternative that also works
    // await page.getByRole('button', { name: 'Zarządzanie kontem' } ).click( { delay: delay, trial: true });
    await page
        .getByRole('button', { name: 'Zaloguj się' })
        .click({ delay: 1000 });

    await page.waitForURL('https://account.tvn.pl/auth/login**');
    await page
        .getByRole('button', { name: 'Log in by e-mail' })
        .click({ delay: 0 });
    await page
        .getByRole('textbox', { name: 'E-mail' })
        .fill(DefaultUser.user_email);
    await page
        .getByRole('textbox', { name: 'Password' })
        .fill(DefaultUser.password);

    await page
        .getByText('Preparing the captcha')
        .waitFor({ state: 'detached' });

    // const waitForFinishedOrTimeout = Promise.race([
    //     page.getByText('Finished').waitFor({ state: 'detached' }),
    //     page.waitForTimeout(delay)
    // ]);
    // await waitForFinishedOrTimeout;

    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('https://tvn24.pl/', { timeout: 10 * 1000 });
    // await page.waitForSelector('div.account-standard--authorized', {
    //     state: 'attached',
    // });
    await expect(
        page.locator('div.account-standard--authorized'),
    ).toBeVisible();
    await page
        .getByRole('button', { name: 'Zarządzanie kontem' })
        .hover({ timeout: delay, trial: true });

    // Assert
    await expect(
        page.locator('div.account-standard--authorized'),
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Wyloguj się' }),
    ).toBeVisible();
    await expect(page.locator('span.account-content__text')).toBeVisible();
    await expect(page.locator('span.account-content__text')).toHaveText('Beth');
});

test('Logins to tvn24.pl/go', { tag: ['@login'] }, async ({ page }) => {
    // Arrange
    test.setTimeout(40 * 1000);
    const delay = 2 * 1000;

    // Act
    await page.goto('/go');

    await page.waitForURL('https://tvn24.pl/go');
    // alternative that also works
    // await page.waitForSelector('button.go-subscription-button');

    await page.getByRole('button', { name: 'Akceptuję' }).click({ delay: 0 });

    //await page.waitForSelector('iframe.__ipPerunElement');
    await expect(page.locator('iframe.__ipPerunElement')).toBeVisible();
    const iframe = page.frameLocator('iframe.__ipPerunElement');
    await iframe.locator('.no-box .__ipPopupClose').click();

    await page
        .locator('button.account-standard__toggle-button')
        .hover({ timeout: 2000 });

    await page
        .getByRole('button', { name: 'Zarządzanie kontem' })
        .hover({ timeout: delay });
    //await page.getByRole('button', { name: 'Zarządzanie kontem' } ).click( { delay: delay, trial: true });
    await page.getByRole('button', { name: 'Zaloguj się' }).click({ delay: 0 });

    await page.waitForURL('https://account.tvn.pl/auth/login**');
    await page
        .getByRole('button', { name: 'Log in by e-mail' })
        .click({ delay: 0 });
    await page
        .getByRole('textbox', { name: 'E-mail' })
        .fill(DefaultUser.user_email);
    await page
        .getByRole('textbox', { name: 'Password' })
        .fill(DefaultUser.password);

    await page
        .getByText('Preparing the captcha')
        .waitFor({ state: 'detached' });

    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('https://tvn24.pl/go', { timeout: 10 * 1000 });
    //await page.waitForSelector('div.account-standard--authorized');
    await expect(
        page.locator('div.account-standard--authorized'),
    ).toBeVisible();
    await page
        .getByRole('button', { name: 'Zarządzanie kontem' })
        .hover({ timeout: delay, trial: true });

    // Assert
    await expect(
        page.locator('div.account-standard--authorized'),
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Wyloguj się' }),
    ).toBeVisible();
    await expect(page.locator('span.account-content__text')).toBeVisible();
    await expect(page.locator('span.account-content__text')).toHaveText('Beth');
});

test(
    'Logins to tvn24.pl new context',
    { tag: ['@smoke'] },
    async ({ browser }) => {
        // Arrange
        test.setTimeout(40 * 1000);
        const delay = 2 * 1000;

        const context = await browser.newContext();
        const page = await context.newPage();
        const newsPage = new NewsPage(page);

        console.log('CI: ', process.env.CI);

        // Act
        await newsPage.open();
        await newsPage.closeCookiesPopup();
        await newsPage.closeNotificationPopup();
        await newsPage.waitForUrl();

        const response = page.waitForResponse(async (response) => {
            console.log(response.status());
            console.log(response.request().method());
            console.log(response.url());
            return response.url().includes('https://tvn');
        });
        await response;

        //await page.waitForURL('https://tvn24.pl/');

        await page
            .getByRole('button', { name: 'Zarządzanie kontem' })
            .hover({ timeout: delay });
        // alternative that also works
        // await page.getByRole('button', { name: 'Zarządzanie kontem' } ).click( { delay: delay, trial: true });
        await page
            .getByRole('button', { name: 'Zaloguj się' })
            .click({ delay: 1000 });

        await page.waitForURL('https://account.tvn.pl/auth/login**');
        await page
            .getByRole('button', { name: 'Log in by e-mail' })
            .click({ delay: 0 });
        await page
            .getByRole('textbox', { name: 'E-mail' })
            .fill(DefaultUser.user_email);
        await page
            .getByRole('textbox', { name: 'Password' })
            .fill(DefaultUser.password);

        await page
            .getByText('Preparing the captcha')
            .waitFor({ state: 'detached' });

        // const waitForFinishedOrTimeout = Promise.race([
        //     page.getByText('Finished').waitFor({ state: 'detached' }),
        //     page.waitForTimeout(delay)
        // ]);
        // await waitForFinishedOrTimeout;

        await page.getByRole('button', { name: 'Sign in' }).click();

        await page.waitForURL('https://tvn24.pl/', { timeout: 10 * 1000 });
        // await page.waitForSelector('div.account-standard--authorized', {
        //     state: 'attached',
        // });
        await expect(
            page.locator('div.account-standard--authorized'),
        ).toBeVisible();
        await page
            .getByRole('button', { name: 'Zarządzanie kontem' })
            .hover({ timeout: delay, trial: true });

        // Assert
        await expect(
            page.locator('div.account-standard--authorized'),
        ).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Wyloguj się' }),
        ).toBeVisible();
        await expect(page.locator('span.account-content__text')).toBeVisible();
        await expect(page.locator('span.account-content__text')).toHaveText(
            process.env.DEFAULT_USER_FIRSTNAME || 'user firstname not found',
        );
    },
);
