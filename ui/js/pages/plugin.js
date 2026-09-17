import { PluginSetting, } from "../components/plugin-setting.js";
export class PluginPage {
    constructor(context) {
        this.context = context;
    }
    loadPlugin(plugin) {
        this.plugin = plugin;
        this.updateSettings();
    }
    async navigate(req) {
        const plugin = await this.fetchPlugin(req.pluginId);
        if (!plugin) {
            console.log("Error fetching plugin ", req.pluginId);
            return;
        }
        this.loadPlugin(plugin);
    }
    async fetchPlugin(pluginId) {
        const plugin = await this.context.api.getPlugin(pluginId);
        return plugin;
    }
    updateSettings() {
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
        this.updateSettings();
    }
    async unmount() { }
}
