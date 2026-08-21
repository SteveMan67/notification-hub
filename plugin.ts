import { readdir } from "node:fs/promises";
import type { Plugin } from "./types";

const pluginDir = "./plugins";

export const plugins: Plugin[] = [];

export async function initPlugins() {
  for (const file of await readdir(pluginDir)) {
    if (!file.endsWith(".ts")) continue;

    const module = await import(`${pluginDir}/${file}`);
    const plugin = module.default as Plugin;

    plugins.push(plugin);
  }

  for (const plugin of plugins) {
    await plugin.initialize();
  }
  return;
}
