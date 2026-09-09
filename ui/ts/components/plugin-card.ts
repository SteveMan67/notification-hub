import { Component } from "./component.js";

type ConnectedStatus = "CONNECTED" | "DISCONNECTED";

interface PluginCardProps {
  id: string;
  title: string;
  description: string;
  status: ConnectedStatus;
}

const defaultPluginCardProps = {
  id: "",
  title: "",
  description: "",
  status: "DISCONNECTED",
} satisfies PluginCardProps;

export class PluginCard extends Component<PluginCardProps> {
  constructor(props: PluginCardProps) {
    super({
      ...defaultPluginCardProps,
      ...props,
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
            <img src="/assets/icons/arrow-right.svg">
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

    if (status) status.textContent = this.props.status;

    if (title) title.textContent = this.props.title;

    if (description) description.textContent = this.props.description;

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
