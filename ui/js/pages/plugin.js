import { PluginSetting, } from "../components/plugin-setting.js";
export class PluginPage {
    constructor() { }
    loadPlugin(plugin) {
        this.plugin = plugin;
        this.updateSettings();
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
