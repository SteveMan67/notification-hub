export type SettingType = "text" | "password" | "number" | "boolean" | "select";

export interface PluginSetting {
  type: SettingType;
  label: string;
  description?: string;
  required?: boolean;
  secret?: boolean;

  options?: {
    label: string;
    value: string;
  }[];
}
