import { BaseNavRequest, Page, PageContext } from "../page-manager";
import template from "../../pages/plugins.html" with { type: "text" };
import { PluginCard } from "../components/plugin-card.js";
import { Plugin } from "../types/index.js";

// the page showing all the plugins at once.

interface IPluginsPage extends Page {}

export interface PluginsNavRequest extends BaseNavRequest {
  page: "plugins";
}

export class PluginsPage implements IPluginsPage {
  private plugins: Plugin[] = [];

  constructor(private context: PageContext) {}

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
      const card = new PluginCard(this.context.nav, {
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
    const plugins = await this.context.api.getPlugins();

    this.plugins = plugins;
    console.log(plugins);
    this.renderPlugins();
  }

  async mount(container: HTMLElement) {
    container.innerHTML = template as unknown as string;

    await this.fetchPlugins();
  }

  async unmount() {}
}
