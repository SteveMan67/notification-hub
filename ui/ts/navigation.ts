import { PageManager, SortType, FilterType } from "./page-manager";

interface INavigation {
  notifications(sort?: SortType, filter?: FilterType): void;
  plugin(pluginId: string): void;
  plugins(): void;
}

export class Nav implements INavigation {
  constructor(private pageManager: PageManager) {}

  notifications(sort?: SortType, filter?: FilterType): void {
    this.pageManager.navigate({
      page: "notifications",
      sort: sort,
      filter: filter,
    });
  }

  plugin(pluginId: string) {
    this.pageManager.navigate({
      page: "plugin",
      pluginId: pluginId,
    });
  }

  plugins() {
    this.pageManager.navigate({
      page: "plugins",
    });
  }
}
