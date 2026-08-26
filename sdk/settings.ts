import type { PluginSettings } from "./context";
import type { Database } from "../db/index.ts";

export class DatabasePluginSettings implements PluginSettings {
  constructor(
    private db: Database,
    private pluginId: string,
  ) {}

  async get(key: string): Promise<string | undefined> {
    return this.db.getPluginSetting(this.pluginId, key);
  }

  async set(key: string, value: string) {
    return this.db.setPluginSetting(this.pluginId, key, value);
  }

  async delete(key: string) {
    return this.db.deletePluginSetting(this.pluginId, key);
  }
}
