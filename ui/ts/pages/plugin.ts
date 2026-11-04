import { Plugin } from "../types";
import template from "../../pages/plugin.html" with { type: "text" };
import type { BaseNavRequest, Page, PageContext } from "../page-manager";
import {
  PluginSetting,
  PluginSettingProps,
} from "../components/OLD-plugin-setting.js";

export interface PluginPage extends Page {}

export interface PluginNavRequest extends BaseNavRequest {
  page: "plugin";
  pluginId: string;
}

export class PluginPage implements PluginPage {
  private plugin?: Plugin;

  constructor(private context: PageContext) {}

  private async loadPlugin(pluginId: string) {
    const plugin = await this.fetchPlugin(pluginId);
    if (!plugin) {
      console.log("Error fetching plugin ", pluginId);
      return;
    }
    this.plugin = plugin;
    this.render();
  }

  async navigate(req: PluginNavRequest) {
    await this.loadPlugin(req.pluginId);
  }

  private async fetchPlugin(pluginId: string): Promise<Plugin | undefined> {
    const plugin = await this.context.api.getPlugin(pluginId);

    return plugin;
  }

  private render() {
    const container = document.querySelector(".plugin-page");

    console.log(container);

    if (!container || !this.plugin) return;

    const title = container.querySelector(".title");
    const description = container.querySelector(".description");

    if (title) title.innerHTML = this.plugin.name;
    if (description && this.plugin.description) {
      description.innerHTML = this.plugin.description;
    }

    this.updateSettings();
  }

  private updateSettings() {
    console.log(this.plugin, "updating settings");
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
    container.innerHTML = template as unknown as string;
  }

  async unmount() {}
}
