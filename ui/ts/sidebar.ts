import type { PageName } from "./page-manager";
import { sidebarItem } from "./components/sidebar-item.js";

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
    const categories = this.categories;
    console.log(categories);
    const categoryContainer = document.querySelector(".category-list");
    const overviewElement = new sidebarItem({
      text: "Overview",
      category: "none",
      page: "notifications",
      notifications: 0,
      selected: false,
      sort: "date",
    });

    categoryContainer?.append(overviewElement);

    for (const category of categories) {
      const categoryElement = new sidebarItem({
        text: category[0].toUpperCase() + category.slice(1) + "s",
        category: category,
        page: "notifications" as PageName,
      });

      if (categoryElement.props.category === "assignment") {
        categoryElement.props.sort = "due";
      }
      categoryContainer?.append(categoryElement);
    }
  }

  private async addSidebarSettings() {
    const settingContainer = document.querySelector(".settings-list");

    const pluginButton = new sidebarItem({
      text: "Plugins",
      page: "plugins",
    });
    settingContainer?.appendChild(pluginButton);

    const settingButton = new sidebarItem({
      text: "Settings",
      page: "settings",
    });
    settingContainer?.appendChild(settingButton);
  }
}
