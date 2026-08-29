import { NotificationPage } from "./pages/notifications.js";
export const pages = {
    notifications: new NotificationPage(),
    plugins: new NotificationPage(),
};
export class pageManager {
    constructor(container) {
        this.container = container;
    }
    show(page) {
        var _a;
        (_a = this.currentPage) === null || _a === void 0 ? void 0 : _a.unmount();
        this.container.innerHTML = "";
        page.mount(this.container);
        this.currentPage = page;
    }
}
