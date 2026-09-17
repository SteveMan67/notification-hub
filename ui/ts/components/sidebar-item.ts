import { PageManager, SortType, FilterType } from "../page-manager.js";
import { Component } from "./component.js";
import { PageName } from "../page-manager.js";
import { NotificationCategory } from "../types/index.js";

export interface sidebarItemProps {
  text: string;
  selected: boolean;
  notifications: number;
  page: PageName;
  sort?: SortType;
  filter?: FilterType;
}

const defaultSidebarItemProps = {
  text: "",
  selected: false,
  notifications: 0,
  sort: "dateSort",
  page: "notifications",
} satisfies sidebarItemProps;

export class sidebarItemFactory {
  constructor(private pageManager: PageManager) {}

  createSidebarItem(props: Partial<sidebarItemProps>): sidebarItem {
    return new sidebarItem(this.pageManager, props);
  }
}

export class sidebarItem extends Component<sidebarItemProps> {
  // use default values here so you don't have to assign each property when making a new one
  private pageManager: PageManager;

  constructor(pageManager: PageManager, props: Partial<sidebarItemProps> = {}) {
    super({
      ...defaultSidebarItemProps,
      ...props,
    });

    this.pageManager = pageManager;
  }

  connectedCallback() {
    this.render();

    this.addEventListener("click", () => {
      document.querySelectorAll("sidebar-item").forEach((e) => {
        e.props.selected = false;
      });
      this.props.selected = true;
      if (this.props.page == "notifications") {
        this.pageManager.navigate({
          page: this.props.page,
          sort: this.props.sort ?? "dateSort",
          filter: this.props.filter,
        });
      } else if (this.props.page === "plugins") {
        this.pageManager.navigate({
          page: this.props.page,
        });
      }
    });

    this.update();
  }

  private render() {
    this.innerHTML = `
      <div class="sidebar-item">
        <span class="text"></span>
        <span class="notifications"></span>
      </div>
    `;
  }

  protected update() {
    console.log("updating sidebar item");
    const item = this.querySelector(".sidebar-item");

    if (!item) return;

    const text = item.querySelector(".text");

    if (text) {
      text.textContent = this.props.text;
    }

    const notifications = item.querySelector("notifications");

    if (notifications) {
      notifications.textContent = String(this.props.notifications);
    }

    item.classList.toggle("selected", this.props.selected);
  }
}

customElements.define("sidebar-item", sidebarItem);

declare global {
  interface HTMLElementTagNameMap {
    "sidebar-item": sidebarItem;
  }
}
