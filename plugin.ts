import { readdir } from "node:fs/promises";
import type { PluginContext, PluginDefinition } from "./sdk";
import { createPluginContext } from "./sdk/createContext";
import { db } from "./db/index";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const pluginDir = join(
  process.env.LOCALAPPDATA ?? homedir(),
  "NotificationHub",
  "plugins",
);

mkdirSync(pluginDir, { recursive: true });

export interface LoadedPlugin {
  plugin: PluginDefinition;
  context: PluginContext;
}

export const plugins: LoadedPlugin[] = [];

export async function initPlugins() {
  for (const file of await readdir(pluginDir)) {
    if (!file.endsWith(".js")) continue;

    const pluginUrl = pathToFileURL(join(pluginDir, file)).href;
    const module = await import(pluginUrl);

    const plugin = module.default as PluginDefinition;

      if (plugin.initialize) {
        await plugin.initialize(context);
      }

      plugins.push({ plugin, context });
    } catch (error) {
      console.error(`Could not load plugin ${file}:`, error);
    }
  }
}
