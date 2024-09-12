import BasePage from './base.page';

export default class NewsPage extends BasePage {
    page_url: string = `${process.env.BASE_URL}` || 'base url not found';
}
