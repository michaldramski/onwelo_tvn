import { expect, Page } from '@playwright/test';

export default class AccountPopup {
    delay: number = 2 * 1000;

    account_button = this.page.getByRole('button', {
        name: 'Zarządzanie kontem',
    });
    account_user_label = this.page.locator('span.account-content__text');
    account_authorized_div = this.page.locator(
        'div.account-standard--authorized',
    );
    login_button = this.page.getByRole('button', { name: 'Zaloguj się' });
    logout_button = this.page.getByRole('button', { name: 'Wyloguj' });

    constructor(protected page: Page) {
        this.page = page;
    }

    async proceedToLoginPage(): Promise<void> {
        await this.openLoginPopup();
        await expect(this.login_button).toBeVisible({ timeout: this.delay });
        await this.login_button.click({ delay: 2 * this.delay });
    }

    async openLoginPopup(): Promise<void> {
        await expect(this.account_button).toBeVisible();
        await this.account_button.hover({ timeout: this.delay, trial: true });
    }
}
