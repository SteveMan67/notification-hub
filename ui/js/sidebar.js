import { sidebarItem } from "./components/sidebar-item.js";
export class Sidebar {
    constructor(categories) {
        this.categories = categories;
    }
    async initSidebar() {
        this.addSidebarCategories();
        this.addSidebarSettings();
    }
    async addSidebarCategories() {
        const categories = this.categories;
        console.log(categories);
        const categoryContainer = document.querySelector(".category-list");
        const overviewElement = new sidebarItem({
            text: "Overview",
            category: "none",
            page: "notifications",
            notifications: 0,
            selected: false,
            sort: "date",
        });
        categoryContainer === null || categoryContainer === void 0 ? void 0 : categoryContainer.append(overviewElement);
        for (const category of categories) {
            const categoryElement = new sidebarItem({
                text: category[0].toUpperCase() + category.slice(1) + "s",
                category: category,
                page: "notifications",
            });
            if (categoryElement.props.category === "assignment") {
                categoryElement.props.sort = "due";
            }
            categoryContainer === null || categoryContainer === void 0 ? void 0 : categoryContainer.append(categoryElement);
        }
    }
    async addSidebarSettings() {
        const settingContainer = document.querySelector(".settings-list");
        const pluginButton = new sidebarItem({
            text: "Plugins",
            page: "plugins",
        });
        settingContainer === null || settingContainer === void 0 ? void 0 : settingContainer.appendChild(pluginButton);
        const settingButton = new sidebarItem({
            text: "Settings",
            page: "settings",
        });
        settingContainer === null || settingContainer === void 0 ? void 0 : settingContainer.appendChild(settingButton);
    }
}
