import { Component } from "./component";

interface sidebarItemProps {
  text: string;
  selected: boolean;
  page: string;
}

export class sidebarItem extends Component<sidebarItemProps> {
  declare text: string;
  declare selected: boolean;
  declare page: string;

  connectedCallback() {
    this.render();

    this.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("select", {
          bubbles: true,
          detail: {
            page: this.page,
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

    item.classList.toggle("selected", this.selected);
  }
}

customElements.define("sidebar-item", sidebarItem);

declare global {
  interface HTMLElementTagNameMap {
    "sidebar-item": sidebarItem;
  }
}
