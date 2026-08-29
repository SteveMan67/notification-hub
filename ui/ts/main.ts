import "./components/notification-card.js";
import "./components/sidebar-item.js";
import { addSidebarCategories, addSidebarSettings } from "./sidebar.js";
import { NotificationPage } from "./pages/notifications.js";
import { pages, PageName, NavRequest, PageManager } from "./page-manager.js";

addSidebarCategories();
addSidebarSettings();

const pageContainer = document.querySelector(".main-content");

if (!pageContainer) {
  throw new Error("Failed to find page container.");
}

document.addEventListener("navigate", async (e) => {
  if (!(e instanceof CustomEvent)) return;

  const req = e.detail as NavRequest;

  const pageManager = new PageManager(pageContainer as HTMLElement);

  pageManager.show(req);
});

const page = new NotificationPage();
await page.mount(pageContainer as HTMLElement);
