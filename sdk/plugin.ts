import type { PluginContext } from "./context.ts";
import type { Notification } from "../types";
import type { PluginSetting } from "./settings.ts";

export interface PluginDefinition {
  id: string;
  name: string;
  version: string;

  settings?: Record<string, PluginSetting>;

  initialize?(ctx: PluginContext): Promise<void>;

  getNotifications(ctx: PluginContext): Promise<Notification[]>;
}

export function definePlugin(plugin: PluginDefinition): PluginDefinition {
  return plugin;
}
