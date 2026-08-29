import { Component } from "./component.js";
export class sidebarItem extends Component {
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
            var _a, _b;
            document.querySelectorAll("sidebar-item").forEach((e) => {
                e.selected = false;
            });
            this.selected = true;
            this.dispatchEvent(new CustomEvent("navigate", {
                bubbles: true,
                detail: {
                    page: this.page,
                    sort: (_a = this.sort) !== null && _a !== void 0 ? _a : "date",
                    filter: (_b = this.category) !== null && _b !== void 0 ? _b : "overview",
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
