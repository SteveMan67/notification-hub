import { api } from "../api/api.js";
export class PluginsPage {
    constructor() {
        this.plugins = [];
    }
    renderPlugins() {
        var _a;
        const container = document.querySelector(".plugin-list");
        if (!container)
            return;
        container.innerHTML = "";
        if (!this.plugins.length) {
            const div = document.createElement("div");
            div.classList.add("no-notifications");
            div.innerHTML = `
      <p>Nothing to see here!</p>
      `;
            container.appendChild(div);
        }
        for (let i = 0; i < this.plugins.length; i++) {
            const plugin = this.plugins[i];
            const card = document.createElement("plugin-card");
            card.id = plugin.id;
            card.title = plugin.name;
            card.description = (_a = plugin.description) !== null && _a !== void 0 ? _a : "";
            card.status = "CONNECTED";
            console.log(card, container);
            container.appendChild(card);
        }
    }
    async fetchPlugins() {
        const plugins = await api.getPlugins();
        this.plugins = plugins;
        console.log(plugins);
        this.renderPlugins();
    }
    async mount(container) {
        const response = await fetch("/pages/plugins.html");
        if (!response.ok) {
            throw new Error("Failed to load Notifications Page: " + response.status);
        }
        container.innerHTML = await response.text();
        await this.fetchPlugins();
    }
    async unmount() { }
}
