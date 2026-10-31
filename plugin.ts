import { readdir } from "node:fs/promises";
import type { PluginContext, PluginDefinition } from "./sdk";
import { createPluginContext } from "./sdk/createContext";
import { db } from "./db/index";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const pluginDir = "./plugins";

export interface LoadedPlugin {
  plugin: PluginDefinition;
  context: PluginContext;
}

export const plugins: LoadedPlugin[] = [];

export async function initPlugins() {
  for (const file of await readdir(pluginDir)) {
    if (!/\.(ts|js)$/.test(file) || file.endsWith(".d.ts")) continue;

    try {
      const url = pathToFileURL(resolve(pluginDir, file)).href;
      const module = await import(url);
      const plugin = module.default as PluginDefinition;
      const context = createPluginContext(db, plugin.id, plugin.name);

      if (plugin.initialize) {
        await plugin.initialize(context);
      }

      plugins.push({ plugin, context });
    } catch (error) {
      console.error(`Could not load plugin ${file}:`, error);
    }
  }
}
