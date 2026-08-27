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

  for (const category of categories) {
    const categoryElement = document.createElement("sidebar-item");

    categoryElement.text = category;

    categoryContainer?.append(categoryElement);
  }
}
