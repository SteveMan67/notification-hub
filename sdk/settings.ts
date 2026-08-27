import type { PluginSettings } from "./context";
import type { Database } from "../db/index.ts";

export class DatabasePluginSettings implements PluginSettings {
  constructor(
    private db: Database,
    private pluginId: string,
  ) {}

  async get<T = string>(key: string): Promise<T | undefined> {
    const value = await this.db.getPluginSetting(this.pluginId, key);

    if (value == undefined) {
      return undefined;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  async set<T = string>(key: string, value: T) {
    await this.db.setPluginSetting(this.pluginId, key, JSON.stringify(value));
  }

  async delete(key: string) {
    await this.db.deletePluginSetting(this.pluginId, key);
  }
}
