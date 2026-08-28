import { Component } from "./component.js";
export class sidebarItem extends Component {
    constructor() {
        super({
            text: "",
            selected: false,
            notifications: 0,
            page: "",
        });
    }
    connectedCallback() {
        this.render();
        this.addEventListener("click", () => {
            document.querySelectorAll("sidebar-item").forEach((e) => {
                e.selected = false;
            });
            this.selected = true;
            this.dispatchEvent(new CustomEvent("select", {
                bubbles: true,
                detail: {
                    page: this.page,
                },
            }));
        });
        this.update();
    }
    render() {
        this.innerHTML = `
      <div class="sidebar-item">
        <span class="text"></span>
        <span class="notifications"></span>
      </div>
    `;
    }
    update() {
        const item = this.querySelector(".sidebar-item");
        if (!item)
            return;
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
