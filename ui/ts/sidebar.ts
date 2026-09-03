import type { PageName } from "./page-manager";
import { api } from "./api/api.js";

export class Sidebar {
  private categories: string[];

  constructor(categories: string[]) {
    this.categories = categories;
  }

  async initSidebar() {
    this.addSidebarCategories();
    this.addSidebarSettings();
  }

  private async addSidebarCategories() {
    const categories = await api.getNotificationCategories();
    console.log(categories);
    const categoryContainer = document.querySelector(".category-list");
    const overviewElement = document.createElement("sidebar-item");

    overviewElement.text = "Overview";
    categoryContainer?.append(overviewElement);
    overviewElement.category = "none";
    overviewElement.page = "notifications";
    overviewElement.selected = true;

    for (const category of categories) {
      const categoryElement = document.createElement("sidebar-item");
      categoryElement.text =
        category[0].toUpperCase() + category.slice(1) + "s";
      categoryElement.category = category;
      categoryElement.page = "notifications" as PageName;

      if (categoryElement.category === "assignment") {
        categoryElement.sort = "due";
      }
      categoryContainer?.append(categoryElement);
    }
  }

  private async addSidebarSettings() {
    const settingContainer = document.querySelector(".settings-list");

    const pluginButton = document.createElement("sidebar-item");
    pluginButton.text = "Plugins";
    pluginButton.page = "plugins";
    settingContainer?.appendChild(pluginButton);

    const settingButton = document.createElement("sidebar-item");
    settingButton.text = "Settings";
    settingButton.page = "settings";
    settingContainer?.appendChild(settingButton);
  }
}
