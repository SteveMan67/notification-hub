import {
  NotificationNavRequest,
  NotificationSort,
  NotificationFilter,
} from "./pages/notifications.js";
import { PluginNavRequest, PluginPage } from "./pages/plugin.js";
import { PluginsNavRequest, PluginsPage } from "./pages/plugins.js";
import { NotificationPage } from "./pages/notifications.js";
import { Context } from "./main.js";
import { Nav } from "./navigation.js";

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
  nav: Nav;
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
  private nav: Nav;

  constructor(
    container: HTMLElement,
    private context: Context,
  ) {
    this.container = container;

    this.nav = new Nav(this);

    const pageContext: PageContext = {
      ...(this.context as Context),
      nav: this.nav,
    };

    this.pages = {
      notifications: new NotificationPage(pageContext),
      plugins: new PluginsPage(pageContext),
      plugin: new PluginPage(pageContext),
    };
  }

  async navigate(req: NavRequest) {
    const page = this.pages[req.page];

    if (page != this.currentPage) {
      this.currentPage?.unmount();

      this.container.innerHTML = "";

      console.log("mounting");
      await page.mount(this.container);

      this.currentPage = page;
    }

    console.log("navigating");
    page.navigate(req);
  }
}
