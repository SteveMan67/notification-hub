import { sidebarItemFactory, } from "./components/sidebar-item.js";
export class Sidebar {
    constructor(pageManager, categories) {
        this.sidebarItemFactory = new sidebarItemFactory(pageManager);
        this.categories = categories;
    }
    addSidebarItem(props) {
        return this.sidebarItemFactory.createSidebarItem(props);
    }
    async initSidebar() {
        this.addSidebarCategories();
        this.addSidebarSettings();
    }
    async addSidebarCategories() {
        const categories = this.categories;
        console.log(categories);
        const categoryContainer = document.querySelector(".category-list");
        if (!categoryContainer)
            return;
        const overviewElement = this.addSidebarItem({
            text: "Overview",
            page: "notifications",
            selected: true,
        });
        categoryContainer.append(overviewElement);
        for (const category of categories) {
            console.log(category);
            const categoryElement = this.addSidebarItem({
                text: category[0].toUpperCase() + category.slice(1) + "s",
                category: category,
                page: "notifications",
            });
            if (categoryElement.props.category === "assignment") {
                categoryElement.props.sort = "due";
            }
            categoryContainer.append(categoryElement);
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
