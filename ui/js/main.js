import "./components/notification-card.js";
import "./components/sidebar-item.js";
import { addSidebarCategories, addSidebarSettings } from "./sidebar.js";
import { NotificationPage } from "./pages/notifications.js";
import { PageManager } from "./page-manager.js";
addSidebarCategories();
addSidebarSettings();
const pageContainer = document.querySelector(".main-content");
if (!pageContainer) {
    throw new Error("Failed to find page container.");
}
document.addEventListener("navigate", async (e) => {
    if (!(e instanceof CustomEvent))
        return;
    const req = e.detail;
    const pageManager = new PageManager(pageContainer);
    pageManager.show(req);
});
const page = new NotificationPage();
await page.mount(pageContainer);
