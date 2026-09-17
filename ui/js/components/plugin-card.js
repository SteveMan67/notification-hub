import { Component } from "./component.js";
const defaultPluginCardProps = {
    id: "",
    title: "",
    description: "",
    status: "DISCONNECTED",
};
export class PluginCard extends Component {
    constructor(pageManager, props) {
        super(Object.assign(Object.assign({}, defaultPluginCardProps), props));
        this.pageManager = pageManager;
    }
    connectedCallback() {
        this.render();
        this.addEventListener("click", () => {
            if (this.props.id) {
                this.pageManager.navigate({
                    page: "plugin",
                    pluginId: this.props.id,
                });
            }
        });
        this.update();
    }
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
            <img src="/assets/icons/arrow-right.svg">
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
            status.textContent = this.props.status;
        if (title)
            title.textContent = this.props.title;
        if (description)
            description.textContent = this.props.description;
        if (configure) {
        }
    }
}
customElements.define("plugin-card", PluginCard);
