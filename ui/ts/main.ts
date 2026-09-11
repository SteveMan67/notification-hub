import "./components/notification-card.js";
import "./components/sidebar-item.js";
import "./components/plugin-card.js";
import { Sidebar } from "./sidebar.js";
import { NotificationPage } from "./pages/notifications.js";
import { PluginPage } from "./pages/plugin.js";
import { PluginsPage } from "./pages/plugins.js";
import type { PageName, Page } from "./page-manager.js";
import { PageManager } from "./page-manager.js";
import { api } from "./api/api.js";

const categories = await api.getNotificationCategories();

const pageContainer = document.querySelector(".main-content");

if (!pageContainer) {
  throw new Error("Failed to find page container.");
}

const pages: Record<PageName, Page> = {
  notifications: new NotificationPage(api),
  plugins: new PluginsPage(api),
  plugin: new PluginPage(),
};

const pageManager = new PageManager(pages, pageContainer as HTMLElement);

const sidebar = new Sidebar(pageManager, categories);

sidebar.initSidebar();

pageManager.navigate({ page: "notifications" });
