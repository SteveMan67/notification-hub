import { Page } from "../page-manager";
import { PluginCard } from "../components/plugin-card.js";
import { Plugin } from "../types/index.js";

// the page showing all the plugins at once.

interface IPluginsPage extends Page {}

interface PluginPageActions {
  getPlugins(): Promise<Plugin[]>;
}

export class PluginsPage implements IPluginsPage {
  private plugins: Plugin[] = [];

  constructor(private actions: PluginPageActions) {}

  private renderPlugins() {
    const container = document.querySelector(".plugin-list");

    if (!container) return;

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
        description: plugin.description ?? "",
        status: "CONNECTED",
      });

      container.appendChild(card);
    }
  }

  navigate() {}

  async fetchPlugins(): Promise<void> {
    const plugins = await this.actions.getPlugins();

    this.plugins = plugins;
    console.log(plugins);
    this.renderPlugins();
  }

  async mount(container: HTMLElement) {
    const response = await fetch("/pages/plugins.html");

    if (!response.ok) {
      throw new Error("Failed to load Notifications Page: " + response.status);
    }

    container.innerHTML = await response.text();

    await this.fetchPlugins();
  }

  async unmount() {}
}
