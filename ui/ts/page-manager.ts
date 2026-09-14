import {
  NotificationNavRequest,
  NotificationSort,
  NotificationFilter,
} from "./pages/notifications.js";
import { PluginNavRequest } from "./pages/plugin.js";
import { PluginsNavRequest } from "./pages/plugins.js";

// Responsibility: Switch Pages with navigate()

export type PageName = "notifications" | "plugins" | "plugin";

export interface BaseNavRequest {
  page: PageName;
}

type NavRequest = NotificationNavRequest | PluginsNavRequest | PluginNavRequest;

export type SortType = NotificationSort;
export type FilterType = NotificationFilter | undefined;

export interface Page {
  mount(container: HTMLElement): Promise<void>;
  unmount(): Promise<void>;

  navigate(req: NavRequest): void;
}

interface IPageManager {
  currentPage?: Page;
  container: HTMLElement;
  pages: Record<PageName, Page>;

  navigate(req: NavRequest): void;
}

export class PageManager implements IPageManager {
  currentPage?: Page;
  readonly container: HTMLElement;
  pages: Record<PageName, Page>;

  constructor(pages: Record<PageName, Page>, container: HTMLElement) {
    this.pages = pages;
    this.container = container;
  }

  navigate(req: NavRequest) {
    const page = this.pages[req.page];

    page.navigate(req);

    if (page != this.currentPage) {
      this.currentPage?.unmount();

      this.container.innerHTML = "";

      console.log(page);

      page.mount(this.container);

      this.currentPage = page;
    }
  }
}
