import {
  NotificationNavRequest,
  NotificationSort,
  NotificationFilter,
} from "./pages/notifications.js";
import { PluginNavRequest, PluginPage } from "./pages/plugin.js";
import { PluginsNavRequest, PluginsPage } from "./pages/plugins.js";
import { NotificationPage } from "./pages/notifications.js";
import { Context } from "./main.js";

// Responsibility: Switch Pages with navigate()

export type PageName = "notifications" | "plugins" | "plugin";

export interface BaseNavRequest {
  page: PageName;
}

export type NavRequest =
  | NotificationNavRequest
  | PluginsNavRequest
  | PluginNavRequest;

export type SortType = NotificationSort;
export type FilterType = NotificationFilter | undefined;

export interface Page {
  mount(container: HTMLElement): Promise<void>;
  unmount(): Promise<void>;

  navigate(req: NavRequest): void;
}

export interface PageContext extends Context {
  pageManager: PageManager;
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

  constructor(
    container: HTMLElement,
    private context: Partial<Context>,
  ) {
    this.container = container;

    const pageContext = {
      ...(this.context as Context),
      pageManager: this,
    };

    this.pages = {
      notifications: new NotificationPage(pageContext),
      plugins: new PluginsPage(pageContext),
      plugin: new PluginPage(pageContext),
    };
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
