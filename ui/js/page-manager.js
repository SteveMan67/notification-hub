import { NotificationPage } from "./pages/notifications.js";
export const pages = {
    notifications: new NotificationPage(),
    plugins: new NotificationPage(),
};
export class PageManager {
    constructor(container) {
        this.container = container;
    }
    show(req) {
        var _a;
        const page = pages[req.page];
        if (req.page === "notifications" && req.filter) {
            page.setFilter(req.filter);
        }
        if (page != this.currentPage) {
            (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.unmount();
            this.container.innerHTML = "";
            page.mount(this.container);
            this.currentPage = page;
        }
    }
}
