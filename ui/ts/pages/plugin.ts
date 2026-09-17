import { Plugin } from "../types";
import type { BaseNavRequest, Page, PageContext } from "../page-manager";
import {
  PluginSetting,
  PluginSettingProps,
} from "../components/plugin-setting.js";

export interface PluginPage extends Page {}

export interface PluginNavRequest extends BaseNavRequest {
  page: "plugin";
  pluginId: string;
}

export class PluginPage implements PluginPage {
  private plugin?: Plugin;

  constructor(private context: PageContext) {}

  private loadPlugin(plugin: Plugin) {
    this.plugin = plugin;
    this.updateSettings();
  }

  async navigate(req: PluginNavRequest) {
    const plugin = await this.fetchPlugin(req.pluginId);
    if (!plugin) {
      console.log("Error fetching plugin ", req.pluginId);
      return;
    }
    this.loadPlugin(plugin);
  }

  async fetchPlugin(pluginId: string): Promise<Plugin | undefined> {
    const plugin = await this.context.api.getPlugin(pluginId);

    return plugin;
  }

  private updateSettings() {
    if (!this.plugin) return;
    const settings = this.plugin.settings;

    const pluginSettingContainer = document.querySelector(".plugin-settings");

    if (!pluginSettingContainer) return;

    pluginSettingContainer.innerHTML = "";

    Object.values(settings).forEach((setting) => {
      const card = new PluginSetting(setting as PluginSettingProps);

      pluginSettingContainer.appendChild(card);
    });
  }

  async mount(container: HTMLElement) {
    const response = await fetch("/pages/plugin.html");

    if (!response.ok) return;

    container.innerHTML = await response.text();

    this.updateSettings();
  }

  async unmount() {}
}
