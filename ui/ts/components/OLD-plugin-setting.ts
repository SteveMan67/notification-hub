import { Component } from "./component.js";

export type SettingType =
  | "text"
  | "password"
  | "number"
  | "boolean"
  | "select"
  | "object-list";

interface PluginSettingBase {
  type: SettingType;
  label: string;
  description?: string;
  required?: boolean;
}

interface TextPluginSetting extends PluginSettingBase {
  type: "text" | "password";
}

interface NumberPluginSetting extends PluginSettingBase {
  type: "number";
}

interface BooleanPluginSetting extends PluginSettingBase {
  type: "boolean";
}

interface SelectPluginSetting extends PluginSettingBase {
  type: "select";
  options: {
    label: string;
    value: string;
  }[];
}

interface ObjectListPluginSetting extends PluginSettingBase {
  type: "object-list";
  fields: PluginSettingProps[];
}

export type PluginSettingProps =
  | TextPluginSetting
  | NumberPluginSetting
  | BooleanPluginSetting
  | SelectPluginSetting
  | ObjectListPluginSetting;

export class PluginSetting extends Component<PluginSettingProps> {
  constructor(props: PluginSettingProps) {
    super(props);
  }

  private render() {
    this.innerHTML = `
    <div class="plugin-setting">
      <p class="title"><span class="required">*</span></p>
      <p class="description"></p>
      <div class="input"></div>
    </div>
    `;
  }

  protected update() {
    const item = this.querySelector(".plugin-setting");

    if (!item) return;

    item.classList.add(this.props.type);

    const title = item.querySelector(".title");
    const required = item.querySelector(".required");
    const description = item.querySelector(".description");

    if (title) title.textContent = this.props.label;

    if (required)
      required.classList.toggle("hidden", !(this.props.required || false));

    if (description) description.textContent = this.props.description ?? "";

    const inputContainer = item.querySelector(".input");

    if (!inputContainer) return;

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

      // add plus button for adding new groups of fields
    }
  }
}
