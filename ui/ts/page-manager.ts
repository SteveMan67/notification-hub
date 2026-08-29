import { NotificationCategory } from "./types";
import { NotificationPage, SortType } from "./pages/notifications.js";

export type PageName = "notifications" | "plugins";

export const pages: Record<PageName, Page> = {
  notifications: new NotificationPage(),
  plugins: new NotificationPage(),
};

export interface NavRequest {
  page: PageName;
  sort?: SortType;
  filter?: NotificationCategory;
}

export interface Page {
  mount(container: HTMLElement): Promise<void>;
  unmount(): Promise<void>;
}

export class PageManager {
  currentPage?: Page;

  constructor(private container: HTMLElement) {}

  show(req: NavRequest) {
    const page = pages[req.page];

    if (req.page === "notifications" && req.filter) {
      (page as NotificationPage).setFilter(req.filter);
      if (req.sort) {
        (page as NotificationPage).setSort(req.sort);
      }
    }

    if (page != this.currentPage) {
      this.currentPage?.unmount();

      this.container.innerHTML = "";

      page.mount(this.container);

      this.currentPage = page;
    }
  }
}
