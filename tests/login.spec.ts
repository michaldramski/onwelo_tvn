import { test, expect } from '@playwright/test';
import NewsPage from '../pages/news.page';
import LoginPage from '../pages/login.page';
import StreamsPage from '../pages/streams.page';

test.use({
    headless: false,
});
test('Logins to tvn24.pl/go', { tag: ['@login'] }, async ({ page }) => {
    // Arrange
    test.setTimeout(60 * 1000);
    const loginPage = new LoginPage(page);
    const streamsPage = new StreamsPage(page);

    // Act
    await streamsPage.open();
    await streamsPage.closeCookiesPopup();
    await streamsPage.closeNotificationPopup();
    await streamsPage.waitForSubscriptionButton();
    await streamsPage.waitForUrl();
    await streamsPage.account_popup.proceedToLoginPage();
    await loginPage.waitForUrl();
    await loginPage.loginByEmail();
    await streamsPage.waitForUrl();
    await streamsPage.account_popup.openLoginPopup();

    // Assert
    await expect(
        streamsPage.account_popup.account_authorized_div,
    ).toBeVisible();
    await expect(streamsPage.account_popup.logout_button).toBeVisible();
    await expect(streamsPage.account_popup.account_user_label).toBeVisible();
    await expect(streamsPage.account_popup.account_user_label).toHaveText(
        process.env.DEFAULT_USER_FIRST_NAME || 'user name not found',
    );
});

test.use({
    headless: false,
});
test('Login to tvn24.pl', { tag: ['@smoke'] }, async ({ page }) => {
    test.setTimeout(40 * 1000);
    // Arrange
    const newsPage = new NewsPage(page);
    const loginPage = new LoginPage(page);
    // Act
    await newsPage.open();
    await newsPage.closeCookiesPopup();
    await newsPage.closeNotificationPopup();
    await newsPage.waitForUrl();
    await newsPage.account_popup.proceedToLoginPage();
    await loginPage.waitForUrl();
    await loginPage.loginByEmail();
    await newsPage.waitForUrl();
    await newsPage.account_popup.openLoginPopup();
    // Assert
    await expect(newsPage.account_popup.account_authorized_div).toBeVisible();
    await expect(newsPage.account_popup.logout_button).toBeVisible();
    await expect(newsPage.account_popup.account_user_label).toBeVisible();
    await expect(newsPage.account_popup.account_user_label).toHaveText(
        process.env.DEFAULT_USER_FIRST_NAME || 'user name not found',
    );
});
