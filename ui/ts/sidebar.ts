import type { PageName, PageManager } from "./page-manager";
import {
  sidebarItemFactory,
  sidebarItemProps,
} from "./components/sidebar-item.js";
import { NotificationCategory } from "./types";

export class Sidebar {
  private categories: string[];
  private sidebarItemFactory: sidebarItemFactory;

  constructor(pageManager: PageManager, categories: string[]) {
    this.sidebarItemFactory = new sidebarItemFactory(pageManager);
    this.categories = categories;
  }

  private addSidebarItem(props: Partial<sidebarItemProps>) {
    return this.sidebarItemFactory.createSidebarItem(props);
  }

  async initSidebar() {
    this.addSidebarCategories();
    this.addSidebarSettings();
  }

  private async addSidebarCategories() {
    const categories = this.categories;
    console.log(categories);
    const categoryContainer = document.querySelector(".category-list");
    const overviewElement = this.addSidebarItem({
      text: "Overview",
      page: "notifications",
      selected: true,
    });

    categoryContainer?.append(overviewElement);

    for (const category of categories) {
      console.log(category);
      const categoryElement = this.addSidebarItem({
        text: category[0].toUpperCase() + category.slice(1) + "s",
        category: category as NotificationCategory,
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

    const pluginButton = this.addSidebarItem({
      text: "Plugins",
      page: "plugins",
    });
    settingContainer?.appendChild(pluginButton);

    const settingButton = this.addSidebarItem({
      text: "Settings",
    });
    settingContainer?.appendChild(settingButton);
  }
}
