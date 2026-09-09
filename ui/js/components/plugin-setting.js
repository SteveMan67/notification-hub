import { Component } from "./component.js";
export class PluginSetting extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.innerHTML = `
    <div class="plugin-setting">
      <p class="title"><span class="required">*</span></p>
      <p class="description"></p>
      <div class="input"></div>
    </div>
    `;
    }
    update() {
        var _a;
        const item = this.querySelector(".plugin-setting");
        if (!item)
            return;
        item.classList.add(this.props.type);
        const title = item.querySelector(".title");
        const required = item.querySelector(".required");
        const description = item.querySelector(".description");
        if (title)
            title.textContent = this.props.label;
        if (required)
            required.classList.toggle("hidden", !(this.props.required || false));
        if (description)
            description.textContent = (_a = this.props.description) !== null && _a !== void 0 ? _a : "";
        const inputContainer = item.querySelector(".input");
        if (!inputContainer)
            return;
        switch (this.props.type) {
            case "text":
                inputContainer.innerHTML = `
        <input type="text">
        `;
                break;
            case "password":
                inputContainer.innerHTML = `
        <input type="password">
        `;
                break;
            case "number":
                inputContainer.innerHTML = `
        <input type="number">
        `;
                break;
            case "boolean":
                inputContainer.innerHTML = `
        <input type="checkbox">
        `;
                break;
            case "select":
                inputContainer.innerHTML = `
        <select>
          ${this.props.options
                    .map((option) => {
                    return `<option value=${option.value}>${option.label}</option>`;
                })
                    .join("")}
        </select>
        `;
                break;
            case "object-list":
                const fieldsContainer = document.createElement("div");
                fieldsContainer.classList.add("fields");
                inputContainer.appendChild(fieldsContainer);
                this.props.fields.forEach((field) => {
                    fieldsContainer.appendChild(new PluginSetting(field));
                });
        }
    }
}
