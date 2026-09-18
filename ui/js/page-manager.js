import { PluginPage } from "./pages/plugin.js";
import { PluginsPage } from "./pages/plugins.js";
import { NotificationPage } from "./pages/notifications.js";
import { Nav } from "./navigation.js";
export class PageManager {
    constructor(container, context) {
        this.context = context;
        this.container = container;
        this.nav = new Nav(this);
        const pageContext = Object.assign(Object.assign({}, this.context), { nav: this.nav });
        this.pages = {
            notifications: new NotificationPage(pageContext),
            plugins: new PluginsPage(pageContext),
            plugin: new PluginPage(pageContext),
        };
    }
    async navigate(req) {
        var _a;
        const page = this.pages[req.page];
        if (page != this.currentPage) {
            (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.unmount();
            this.container.innerHTML = "";
            console.log("mounting");
            await page.mount(this.container);
            this.currentPage = page;
        }
        console.log("navigating");
        page.navigate(req);
    }
}
