import { SortType } from "../pages/notifications.js";
import { Component } from "./component.js";

interface sidebarItemProps {
  text: string;
  selected: boolean;
  notifications: number;
  sort: SortType;
  page: string;
  category?: string;
}

const defaultSidebarItemProps = {
  text: "",
  selected: false,
  notifications: 0,
  sort: "date",
  page: "",
} satisfies sidebarItemProps;

export class sidebarItem extends Component<sidebarItemProps> {
  // use default values here so you don't have to assign each property when making a new one

  constructor(props: Partial<sidebarItemProps> = {}) {
    super({
      ...defaultSidebarItemProps,
      ...props,
    });
  }

  connectedCallback() {
    this.render();

    this.addEventListener("click", () => {
      document.querySelectorAll("sidebar-item").forEach((e) => {
        e.props.selected = false;
      });
      this.props.selected = true;
      this.dispatchEvent(
        new CustomEvent("navigate", {
          bubbles: true,
          detail: {
            page: this.props.page,
            sort: this.props.sort ?? "date",
            filter: this.props.category ?? "overview",
          },
        }),
      );
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
