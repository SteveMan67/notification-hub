import { Component } from "./component.js";
export class PluginCard extends Component {
    constructor() {
        super({
            id: "",
            title: "",
            description: "",
            status: "DISCONNECTED",
        });
    }
    connectedCallback() { }
    render() {
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
    update() {
        const item = this.querySelector(".plugin-card");
        if (!item)
            return;
        const status = this.querySelector("#status");
        const title = this.querySelector("#title");
        const description = this.querySelector("#description");
        const configure = this.querySelector("#configure");
        if (status)
            status.textContent = this.status;
        if (title)
            title.textContent = this.title;
        if (description)
            description.textContent = this.description;
        if (configure) {
        }
    }
}
customElements.define("plugin-card", PluginCard);
