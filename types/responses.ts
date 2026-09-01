import { PluginSetting } from "../sdk";

export type pluginResponseItem = {
  id: string;
  name: string;
  version: string | "";

  settings: Record<string, PluginSetting>;
};

export type pluginsResponse = pluginResponseItem[];
