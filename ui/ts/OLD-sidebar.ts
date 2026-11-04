import type { PageManager, FilterType } from "./page-manager";
import {
  sidebarItemFactory,
  sidebarItemProps,
} from "./components/sidebar-item.js";
import { Nav } from "./navigation.js";

const filterNames: Record<NonNullable<FilterType>, string> = {
  assignmentFilter: "Assignments",
  emailFilter: "Emails",
  messageFilter: "Messages",
  unreadFilter: "Unread",
  uncompletedFilter: "Uncompleted",
};

export class Sidebar {
  private filters: FilterType[];
  private sidebarItemFactory: sidebarItemFactory;

  constructor(pageManager: PageManager, filters: FilterType[]) {
    this.sidebarItemFactory = new sidebarItemFactory(new Nav(pageManager));
    this.filters = filters;
  }

  private addSidebarItem(props: Partial<sidebarItemProps>) {
    return this.sidebarItemFactory.createSidebarItem(props);
  }

  async initSidebar() {
    this.addSidebarCategories();
    this.addSidebarSettings();
  }

  private async addSidebarCategories() {
    const filters = this.filters;
    const categoryContainer = document.querySelector(".category-list");

    if (!categoryContainer) return;

    const overviewElement = this.addSidebarItem({
      text: "Overview",
      page: "notifications",
      selected: true,
    });

    categoryContainer.append(overviewElement);

    for (const filter of filters) {
      if (!filter) return;

      const filterElement = this.addSidebarItem({
        text: filterNames[filter],
        filter: filter,
        page: "notifications",
      });

      if (filterElement.props.filter === "assignmentFilter") {
        filterElement.props.sort = "dueDateSort";
        filterElement.props.filter = "uncompletedFilter";
      }
      categoryContainer.append(filterElement);
    }
  }

  private async addSidebarSettings() {
    const settingContainer = document.querySelector(".settings-list");

    if (!settingContainer) return;

    const pluginButton = this.addSidebarItem({
      text: "Plugins",
      page: "plugins",
    });
    settingContainer.appendChild(pluginButton);

    const settingButton = this.addSidebarItem({
      text: "Settings",
    });
    settingContainer.appendChild(settingButton);
  }
}
