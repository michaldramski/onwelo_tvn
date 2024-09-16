import { Page } from '@playwright/test';

export default class BasePage {
    page_url: string = process.env.BASE_URL || 'base url not found';
    delay: number = 2 * 1000;

    constructor(protected page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto('');
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async waitForUrl(url: string = this.page_url): Promise<void> {
        await this.page.waitForURL(url);
    }

    async close(): Promise<void> {
        await this.page.close();
    }

    async closeCookiesPopup(): Promise<void> {
        await this.page.getByRole('button', { name: 'Akceptuję' }).click();
    }

    async closeNotificationPopup(): Promise<void> {
        const iframe = this.page.frameLocator('iframe.__ipPerunElement');
        await iframe.locator('.no-box .__ipPopupClose').click();
    }
}
