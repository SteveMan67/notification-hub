import { plugins } from "./plugin.ts";
import { db } from "./db/index.ts";

export async function updateNotifications() {
  for (const plugin of plugins) {
    try {
      const notifications = await plugin.getNotifications();

      for (const notification of notifications) {
        await db.addNotification(notification);
      }
    } catch (error) {
      console.error(`failed to update ${plugin.id}:`, error);
    }
  }
}
