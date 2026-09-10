import { NotificationCategory } from "./types";
import { SortType } from "./pages/notifications.js";

// Responsibility: Switch Pages with show()

export type PageName = "notifications" | "plugins" | "plugin";

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

interface IPageManager {
  currentPage?: Page;
  container: HTMLElement;
  pages: Record<PageName, Page>;

  show(page: PageName): void;
}

export class PageManager implements IPageManager {
  currentPage?: Page;
  readonly container: HTMLElement;
  pages: Record<PageName, Page>;

  constructor(pages: Record<PageName, Page>, container: HTMLElement) {
    this.pages = pages;
    this.container = container;
  }

  show(page: PageName) {
    const pageInstance = this.pages[page];

    if (pageInstance != this.currentPage) {
      this.currentPage?.unmount();

      this.container.innerHTML = "";

      console.log(page);

      pageInstance.mount(this.container);

      this.currentPage = pageInstance;
    }
  }
}
