import "./components/notification-card.js";
import "./components/sidebar-item.js";
import { addSidebarCategories, addSidebarSettings } from "./sidebar.js";
import { NotificationPage } from "./pages/notifications.js";
import { pages } from "./page-manager.js";
addSidebarCategories();
addSidebarSettings();
const pageContainer = document.querySelector(".main-content");
if (!pageContainer) {
    throw new Error("Failed to find page container.");
}
document.addEventListener("navigate", async (e) => {
    if (!(e instanceof CustomEvent))
        return;
    const { page, filter } = e.detail;
    const pageInstance = pages[page];
    await pageInstance.mount(pageContainer);
});
const page = new NotificationPage();
await page.mount(pageContainer);
