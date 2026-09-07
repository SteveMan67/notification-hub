import { api } from "./api/api.js";
export class Sidebar {
    constructor(categories) {
        this.categories = categories;
    }
    async initSidebar() {
        this.addSidebarCategories();
        this.addSidebarSettings();
    }
    async addSidebarCategories() {
        const categories = await api.getNotificationCategories();
        console.log(categories);
        const categoryContainer = document.querySelector(".category-list");
        const overviewElement = document.createElement("sidebar-item");
        overviewElement.text = "Overview";
        categoryContainer === null || categoryContainer === void 0 ? void 0 : categoryContainer.append(overviewElement);
        overviewElement.category = "none";
        overviewElement.page = "notifications";
        overviewElement.selected = true;
        for (const category of categories) {
            const categoryElement = document.createElement("sidebar-item");
            categoryElement.text =
                category[0].toUpperCase() + category.slice(1) + "s";
            categoryElement.category = category;
            categoryElement.page = "notifications";
            if (categoryElement.category === "assignment") {
                categoryElement.sort = "due";
            }
            categoryContainer === null || categoryContainer === void 0 ? void 0 : categoryContainer.append(categoryElement);
        }
    }
    async addSidebarSettings() {
        const settingContainer = document.querySelector(".settings-list");
        const pluginButton = document.createElement("sidebar-item");
        pluginButton.text = "Plugins";
        pluginButton.page = "plugins";
        settingContainer === null || settingContainer === void 0 ? void 0 : settingContainer.appendChild(pluginButton);
        const settingButton = document.createElement("sidebar-item");
        settingButton.text = "Settings";
        settingButton.page = "settings";
        settingContainer === null || settingContainer === void 0 ? void 0 : settingContainer.appendChild(settingButton);
    }
}
