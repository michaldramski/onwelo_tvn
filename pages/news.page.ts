import BasePage from './base.page';
import AccountPopup from './account.popup';

export default class NewsPage extends BasePage {
    page_url: string = `${process.env.BASE_URL}` || 'base url not found';

    account_popup = new AccountPopup(this.page);
}
