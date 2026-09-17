import { PluginPage } from "./pages/plugin.js";
import { PluginsPage } from "./pages/plugins.js";
import { NotificationPage } from "./pages/notifications.js";
export class PageManager {
    constructor(container, context) {
        this.context = context;
        this.container = container;
        const pageContext = Object.assign(Object.assign({}, this.context), { pageManager: this });
        this.pages = {
            notifications: new NotificationPage(pageContext),
            plugins: new PluginsPage(pageContext),
            plugin: new PluginPage(pageContext),
        };
    }
    navigate(req) {
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
