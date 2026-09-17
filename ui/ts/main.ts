import "./components/notification-card.js";
import "./components/sidebar-item.js";
import "./components/plugin-card.js";
import { Sidebar } from "./sidebar.js";
import { api, NotificationHubApi } from "./api/api.js";
import { PageManager } from "./page-manager.js";

export interface Context {
  api: NotificationHubApi;
  pageManager: PageManager;
}

const pageContainer = document.querySelector(".main-content");

if (!pageContainer) {
  throw new Error("Failed to find page container.");
}

const context: Omit<Context, "pageManager"> = {
  api: api,
};

const pageManager = new PageManager(pageContainer as HTMLElement, context);

const sidebar = new Sidebar(pageManager, [
  "messageFilter",
  "emailFilter",
  "assignmentFilter",
  "unreadFilter",
]);

sidebar.initSidebar();

pageManager.navigate({ page: "notifications" });
