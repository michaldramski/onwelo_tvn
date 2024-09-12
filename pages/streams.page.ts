import BasePage from './base.page';

export default class StreamsPage extends BasePage {
    page_url: string =
        `${process.env.BASE_URL}` + `/go` || 'base url not found';
}
