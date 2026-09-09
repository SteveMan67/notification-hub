export class PageManager {
    constructor(pages, container) {
        this.pages = pages;
        this.container = container;
    }
    show(req) {
        var _a;
        const page = this.pages[req.page];
        page.navigate(req);
        if (page != this.currentPage) {
            (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.unmount();
            this.container.innerHTML = "";
            console.log(page);
            page.mount(this.container);
            this.currentPage = page;
        }
    }
}
