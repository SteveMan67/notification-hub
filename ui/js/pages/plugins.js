import { PluginCard } from "../components/plugin-card.js";
export class PluginsPage {
    constructor(actions) {
        this.actions = actions;
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
            const card = new PluginCard({
                id: plugin.id,
                title: plugin.name,
                description: (_a = plugin.description) !== null && _a !== void 0 ? _a : "",
                status: "CONNECTED",
            });
            container.appendChild(card);
        }
    }
    navigate() { }
    async fetchPlugins() {
        const plugins = await this.actions.getPlugins();
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
