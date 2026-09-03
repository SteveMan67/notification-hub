import "./components/notification-card.js";
import "./components/sidebar-item.js";
import { Sidebar } from "./sidebar.js";
import { NotificationPage } from "./pages/notifications.js";
import { NavRequest, PageManager } from "./page-manager.js";
import { api } from "./api/api.js";

const categories = await api.getNotificationCategories();

const sidebar = new Sidebar(categories);

sidebar.initSidebar();

const pageContainer = document.querySelector(".main-content");

if (!pageContainer) {
  throw new Error("Failed to find page container.");
}

const pageManager = new PageManager(pageContainer as HTMLElement);

document.addEventListener("navigate", async (e) => {
  if (!(e instanceof CustomEvent)) return;

  const req = e.detail as NavRequest;

  pageManager.show(req);
});

const page = new NotificationPage();
await page.mount(pageContainer as HTMLElement);
