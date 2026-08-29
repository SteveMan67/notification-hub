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

export class sidebarItem extends Component<sidebarItemProps> {
  declare text: string;
  declare selected: boolean;
  declare sort: SortType;
  declare page: string;
  declare notifications: number;
  declare category?: string;

  constructor() {
    super({
      text: "",
      selected: false,
      notifications: 0,
      page: "",
      sort: "date",
    });
  }

  connectedCallback() {
    this.render();

    this.addEventListener("click", () => {
      document.querySelectorAll("sidebar-item").forEach((e) => {
        e.selected = false;
      });
      this.selected = true;
      this.dispatchEvent(
        new CustomEvent("navigate", {
          bubbles: true,
          detail: {
            page: this.page,
            sort: this.sort ?? "date",
            filter: this.category ?? "overview",
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
      text.textContent = this.text;
    }

    const notifications = item.querySelector("notifications");

    if (notifications) {
      notifications.textContent = String(this.notifications);
    }

    item.classList.toggle("selected", this.selected);
  }
}

customElements.define("sidebar-item", sidebarItem);

declare global {
  interface HTMLElementTagNameMap {
    "sidebar-item": sidebarItem;
  }
}
