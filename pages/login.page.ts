import { Page } from '@playwright/test';
import BasePage from './base.page';
import { DefaultUser } from '../test-data/test-users';

export default class LoginPage extends BasePage {
    page_url: string = `${process.env.LOGIN_URL}` || 'login url not found';

    constructor(protected page: Page) {
        super(page);
    }

    async loginByEmail(
        email: string = DefaultUser.user_email,
        password: string = DefaultUser.password,
    ): Promise<void> {
        await this.page
            .getByRole('button', { name: 'Log in by e-mail' })
            .click({ delay: 0 });
        await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
        await this.page
            .getByRole('textbox', { name: 'Password' })
            .fill(password);
        await this.page
            .getByText('Preparing the captcha')
            .waitFor({ state: 'detached' });

        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }
}
