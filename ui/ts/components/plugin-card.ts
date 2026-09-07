import { Component } from "./component.js";

type ConnectedStatus = "CONNECTED" | "DISCONNECTED";

interface PluginCardProps {
  id: string;
  title: string;
  description: string;
  status: ConnectedStatus;
}

export class PluginCard extends Component<PluginCardProps> {
  declare id: string;
  declare title: string;
  declare description: string;
  declare status: ConnectedStatus;

  constructor() {
    super({
      id: "",
      title: "",
      description: "",
      status: "DISCONNECTED",
    });
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  private render() {
    this.innerHTML = `
      <div class="plugin-card">
        <div class="info">
          <p id="status"></p>
          <p id="title"></p>
          <p id="description"></p>
        </div>
        <div class="right-info">
          <a id="configure">Configure</a>
          <div class="arrow">
            <img>
          </div>
        </div>
      </div>
    `;
  }

  protected update() {
    const item = this.querySelector(".plugin-card");

    if (!item) return;

    const status = this.querySelector("#status");
    const title = this.querySelector("#title");
    const description = this.querySelector("#description");
    const configure = this.querySelector<HTMLAnchorElement>("#configure");

    if (status) status.textContent = this.status;

    if (title) title.textContent = this.title;

    if (description) description.textContent = this.description;

    if (configure) {
    }
  }
}

customElements.define("plugin-card", PluginCard);

declare global {
  interface HTMLElementTagNameMap {
    "plugin-card": PluginCard;
  }
}
