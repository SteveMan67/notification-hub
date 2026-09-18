import { Component } from "./component.js";
const defaultSidebarItemProps = {
    text: "",
    selected: false,
    notifications: 0,
    sort: "dateSort",
    page: "notifications",
};
export class sidebarItemFactory {
    constructor(nav) {
        this.nav = nav;
    }
    createSidebarItem(props) {
        return new sidebarItem(this.nav, props);
    }
}
export class sidebarItem extends Component {
    constructor(nav, props = {}) {
        super(Object.assign(Object.assign({}, defaultSidebarItemProps), props));
        this.nav = nav;
    }
    connectedCallback() {
        this.render();
        this.addEventListener("click", () => {
            document.querySelectorAll("sidebar-item").forEach((e) => {
                e.props.selected = false;
            });
            this.props.selected = true;
            if (this.props.page == "notifications") {
                this.nav.notifications(this.props.sort, this.props.filter);
            }
            else if (this.props.page === "plugins") {
                this.nav.plugins();
            }
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
