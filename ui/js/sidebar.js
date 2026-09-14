import { sidebarItemFactory, } from "./components/sidebar-item.js";
const filterNames = {
    assignmentFilter: "Assignments",
    emailFilter: "Emails",
    messageFilter: "Messages",
    unreadFilter: "Unread",
};
export class Sidebar {
    constructor(pageManager, filters) {
        this.sidebarItemFactory = new sidebarItemFactory(pageManager);
        this.filters = filters;
    }
    addSidebarItem(props) {
        return this.sidebarItemFactory.createSidebarItem(props);
    }
    async initSidebar() {
        this.addSidebarCategories();
        this.addSidebarSettings();
    }
    async addSidebarCategories() {
        const filters = this.filters;
        const categoryContainer = document.querySelector(".category-list");
        if (!categoryContainer)
            return;
        const overviewElement = this.addSidebarItem({
            text: "Overview",
            page: "notifications",
            selected: true,
        });
        categoryContainer.append(overviewElement);
        for (const filter of filters) {
            if (!filter)
                return;
            const filterElement = this.addSidebarItem({
                text: filterNames[filter],
                filter: filter,
                page: "notifications",
            });
            if (filterElement.props.filter === "assignmentFilter") {
                filterElement.props.sort = "dueDateSort";
            }
            categoryContainer.append(filterElement);
        }
    }
    async addSidebarSettings() {
        const settingContainer = document.querySelector(".settings-list");
        if (!settingContainer)
            return;
        const pluginButton = this.addSidebarItem({
            text: "Plugins",
            page: "plugins",
        });
        settingContainer.appendChild(pluginButton);
        const settingButton = this.addSidebarItem({
            text: "Settings",
        });
        settingContainer.appendChild(settingButton);
    }
}
