import { Plugin } from "../types";
import type { Page } from "../page-manager";
import {
  PluginSetting,
  PluginSettingProps,
} from "../components/plugin-setting";

export interface PluginPage extends Page {}

export class PluginPage implements PluginPage {
  private plugin: Plugin;

  constructor(plugin: Plugin) {
    this.plugin = plugin;
  }

  private updateSettings() {
    const settings = this.plugin.settings;

    const pluginSettingContainer = document.querySelector(".plugin-settings");

    if (!pluginSettingContainer) return;

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
