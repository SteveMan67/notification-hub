import { PluginSetting, } from "../components/plugin-setting.js";
export class PluginPage {
    constructor(context) {
        this.context = context;
    }
    async loadPlugin(pluginId) {
        const plugin = await this.fetchPlugin(pluginId);
        if (!plugin) {
            console.log("Error fetching plugin ", pluginId);
            return;
        }
        this.plugin = plugin;
        this.render();
    }
    async navigate(req) {
        await this.loadPlugin(req.pluginId);
    }
    async fetchPlugin(pluginId) {
        const plugin = await this.context.api.getPlugin(pluginId);
        return plugin;
    }
    render() {
        const container = document.querySelector(".plugin-page");
        console.log(container);
        if (!container || !this.plugin)
            return;
        const title = container.querySelector(".title");
        const description = container.querySelector(".description");
        if (title)
            title.innerHTML = this.plugin.name;
        if (description && this.plugin.description) {
            description.innerHTML = this.plugin.description;
        }
        this.updateSettings();
    }
    updateSettings() {
        console.log(this.plugin, "updating settings");
        if (!this.plugin)
            return;
        const settings = this.plugin.settings;
        const pluginSettingContainer = document.querySelector(".plugin-settings");
        if (!pluginSettingContainer)
            return;
        pluginSettingContainer.innerHTML = "";
        Object.values(settings).forEach((setting) => {
            const card = new PluginSetting(setting);
            pluginSettingContainer.appendChild(card);
        });
    }
    async mount(container) {
        const response = await fetch("/pages/plugin.html");
        if (!response.ok)
            return;
        container.innerHTML = await response.text();
        return;
    }
    async unmount() { }
}
