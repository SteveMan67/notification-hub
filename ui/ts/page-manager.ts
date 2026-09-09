import { NotificationCategory } from "./types";
import { NotificationPage, SortType } from "./pages/notifications.js";
import { PluginsPage } from "./pages/plugins.js";

export type PageName = "notifications" | "plugins";

export interface NavRequest {
  page: PageName;
  sort?: SortType;
  filter?: NotificationCategory;
}

export interface Page {
  mount(container: HTMLElement): Promise<void>;
  unmount(): Promise<void>;

  navigate(req: NavRequest): void;
}

interface PageManagerActions {
  getNotifications(): Promise<void>;
}

export class PageManager {
  currentPage?: Page;
  private readonly container: HTMLElement;
  private pages: Record<PageName, Page>;

  constructor(pages: Record<PageName, Page>, container: HTMLElement) {
    this.pages = pages;
    this.container = container;
  }

  show(req: NavRequest) {
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
