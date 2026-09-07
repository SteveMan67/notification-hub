import { Component } from "./component.js";
const defaultSidebarItemProps = {
    text: "",
    selected: false,
    notifications: 0,
    sort: "date",
    page: "",
};
export class sidebarItem extends Component {
    constructor(props = {}) {
        super(Object.assign(Object.assign({}, defaultSidebarItemProps), props));
    }
    connectedCallback() {
        this.render();
        this.addEventListener("click", () => {
            var _a, _b;
            document.querySelectorAll("sidebar-item").forEach((e) => {
                e.props.selected = false;
            });
            this.props.selected = true;
            this.dispatchEvent(new CustomEvent("navigate", {
                bubbles: true,
                detail: {
                    page: this.props.page,
                    sort: (_a = this.props.sort) !== null && _a !== void 0 ? _a : "date",
                    filter: (_b = this.props.category) !== null && _b !== void 0 ? _b : "overview",
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
