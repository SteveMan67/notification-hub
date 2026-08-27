import type { PluginContext } from "./context";
import { NotificationLogger } from "./logger";
import { DatabasePluginSettings } from "./settings";
import type { Database } from "../db";

export function createPluginContext(
  db: Database,
  pluginId: string,
  pluginName: string,
): PluginContext {
  return {
    settings: new DatabasePluginSettings(db, pluginId),
    logger: new NotificationLogger(pluginName),

    async addNotification(notification) {
      db.addNotification(notification);
    },
  };
}
