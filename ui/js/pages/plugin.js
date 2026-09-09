import { PluginSetting, } from "../components/plugin-setting";
export class PluginPage {
    constructor(plugin) {
        this.plugin = plugin;
    }
    updateSettings() {
        const settings = this.plugin.settings;
        const pluginSettingContainer = document.querySelector(".plugin-settings");
        if (!pluginSettingContainer)
            return;
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
