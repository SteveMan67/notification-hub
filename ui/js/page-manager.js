import { NotificationPage } from "./pages/notifications.js";
import { PluginsPage } from "./pages/plugins.js";
export const pages = {
    notifications: new NotificationPage(),
    plugins: new PluginsPage(),
};
export class PageManager {
    constructor(container) {
        this.container = container;
    }
    show(req) {
        var _a;
        const page = pages[req.page];
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
