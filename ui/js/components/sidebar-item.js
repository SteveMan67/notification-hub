import { Component } from "./component.js";
const defaultSidebarItemProps = {
    text: "",
    selected: false,
    notifications: 0,
    sort: "date",
    page: "notifications",
};
export class sidebarItemFactory {
    constructor(pageManager) {
        this.pageManager = pageManager;
    }
    createSidebarItem(props) {
        return new sidebarItem(this.pageManager, props);
    }
}
export class sidebarItem extends Component {
    constructor(pageManager, props = {}) {
        super(Object.assign(Object.assign({}, defaultSidebarItemProps), props));
        this.pageManager = pageManager;
    }
    connectedCallback() {
        this.render();
        this.addEventListener("click", () => {
            var _a;
            document.querySelectorAll("sidebar-item").forEach((e) => {
                e.props.selected = false;
            });
            this.props.selected = true;
            this.pageManager.navigate({
                page: this.props.page,
                sort: (_a = this.props.sort) !== null && _a !== void 0 ? _a : "date",
                filter: this.props.category,
            });
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
        console.log("updating sidebar item");
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
