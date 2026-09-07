import { NotificationCategory } from "./types";
import { NotificationPage, SortType } from "./pages/notifications.js";
import { PluginsPage } from "./pages/plugins.js";

export type PageName = "notifications" | "plugins";

export const pages: Record<PageName, Page> = {
  notifications: new NotificationPage(),
  plugins: new PluginsPage(),
};

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

export class PageManager {
  currentPage?: Page;

  constructor(private container: HTMLElement) {}

  show(req: NavRequest) {
    const page = pages[req.page];

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
