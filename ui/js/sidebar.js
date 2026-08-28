async function getCategories() {
    const response = await fetch("/api/categories", {
        method: "GET",
    });
    const body = await response.json();
    return body.categories;
}
export async function addSidebarCategories() {
    const categories = await getCategories();
    const categoryContainer = document.querySelector(".category-list");
    const overviewElement = document.createElement("sidebar-item");
    overviewElement.text = "Overview";
    categoryContainer === null || categoryContainer === void 0 ? void 0 : categoryContainer.append(overviewElement);
    overviewElement.selected = true;
    for (const category of categories) {
        const categoryElement = document.createElement("sidebar-item");
        categoryElement.text = category[0].toUpperCase() + category.slice(1) + "s";
        categoryContainer === null || categoryContainer === void 0 ? void 0 : categoryContainer.append(categoryElement);
    }
}
export function addSidebarSettings() {
    const settingContainer = document.querySelector(".settings-list");
    console.log(settingContainer);
    const pluginButton = document.createElement("sidebar-item");
    pluginButton.text = "Plugins";
    settingContainer === null || settingContainer === void 0 ? void 0 : settingContainer.appendChild(pluginButton);
    const settingButton = document.createElement("sidebar-item");
    settingButton.text = "Settings";
    settingContainer === null || settingContainer === void 0 ? void 0 : settingContainer.appendChild(settingButton);
}
