import { readdir } from "node:fs/promises";
import type { Plugin } from "./types";
import type { PluginContext, PluginDefinition } from "./sdk";
import { createPluginContext } from "./sdk/createContext";
import { db } from "./db/index";

const pluginDir = "./plugins";

export interface LoadedPlugin {
  plugin: PluginDefinition;
  context: PluginContext;
}

export const plugins: LoadedPlugin[] = [];

export async function initPlugins() {
  for (const file of await readdir(pluginDir)) {
    if (!file.endsWith(".ts")) continue;

    const module = await import(`${pluginDir}/${file}`);
    const plugin = module.default as PluginDefinition;

    const context = createPluginContext(db, plugin.id, plugin.name);

    plugins.push({ plugin: plugin, context: context });
  }

  for (const { plugin, context } of plugins) {
    if (plugin.initialize) {
      await plugin.initialize(context);
    }
  }
  return;
}
