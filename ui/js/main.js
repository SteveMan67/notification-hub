import "./components/notification-card.js";
import "./components/sidebar-item.js";
import "./components/plugin-card.js";
import { Sidebar } from "./sidebar.js";
import { api } from "./api/api.js";
import { PageManager } from "./page-manager.js";
const pageContainer = document.querySelector(".main-content");
if (!pageContainer) {
    throw new Error("Failed to find page container.");
}
const context = {
    api: api,
};
const pageManager = new PageManager(pageContainer, context);
const sidebar = new Sidebar(pageManager, [
    "messageFilter",
    "emailFilter",
    "assignmentFilter",
    "unreadFilter",
]);
sidebar.initSidebar();
pageManager.navigate({ page: "notifications" });
