import { expect } from '@playwright/test';
import AccountPopup from './account.popup';
import BasePage from './base.page';

export default class StreamsPage extends BasePage {
    page_url: string =
        `${process.env.BASE_URL}` + `/go` || 'base url not found';

    account_popup = new AccountPopup(this.page);

    subscription_button = this.page.locator('button.go-subscription-button');

    async open(): Promise<void> {
        await this.page.goto(this.page_url);
    }

    async waitForSubscriptionButton(): Promise<void> {
        await expect(this.subscription_button).toBeVisible();
    }
}
