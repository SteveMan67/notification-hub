import type { PageName } from "./page-manager";

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
  categoryContainer?.append(overviewElement);
  overviewElement.category = "none";
  overviewElement.page = "notifications";
  overviewElement.selected = true;

  for (const category of categories) {
    const categoryElement = document.createElement("sidebar-item");
    categoryElement.text = category[0].toUpperCase() + category.slice(1) + "s";
    categoryElement.category = category;
    categoryElement.page = "notifications" as PageName;
    categoryContainer?.append(categoryElement);
  }
}

export function addSidebarSettings() {
  const settingContainer = document.querySelector(".settings-list");

  const pluginButton = document.createElement("sidebar-item");
  pluginButton.text = "Plugins";
  pluginButton.page = "plugins";
  settingContainer?.appendChild(pluginButton);

  const settingButton = document.createElement("sidebar-item");
  settingButton.text = "Settings";
  settingButton.page = "settings";
  settingContainer?.appendChild(settingButton);
}
