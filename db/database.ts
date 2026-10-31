import { SQL } from "bun";
import type { Database } from "../db/index.ts";
import type { NotificationCategory, Notification } from "../types/index.ts";

const sql = new SQL("sqlite://./notifications.sqlite");

await sql`
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY,
    source_id TEXT NOT NULL,
    source_notification_id TEXT NOT NULL,
    category TEXT,

    title TEXT NOT NULL,
    body TEXT,
    timestamp TEXT NOT NULL,

    read INTEGER NOT NULL DEFAULT FALSE,

    data TEXT NOT NULL DEFAULT '{}',

    UNIQUE (source_id, source_notification_id)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS settings (
    plugin_id TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,

    PRIMARY KEY (plugin_id, key)
  )
`;

export class sqliteDatabase implements Database {
  async getPluginSetting(
    pluginId: string,
    key: string,
  ): Promise<string | undefined> {
    const response = await sql`
      SELECT value from settings
      WHERE plugin_id = ${pluginId} AND key = ${key};
    `;

    return response[0]?.value;
  }

  async setPluginSetting(
    pluginId: string,
    key: string,
    value: string,
  ): Promise<void> {
    await sql`
      INSERT INTO settings (plugin_id, key, value) 
      VALUES (${pluginId}, ${key}, ${value})
      ON CONFLICT (plugin_id, key)
      DO UPDATE SET value = EXCLUDED.value;
    `;
    return;
  }

  async deletePluginSetting(pluginId: string, key: string): Promise<void> {
    await sql`
      DELETE from settings
      WHERE plugin_id = ${pluginId} AND key = ${key};
    `;
    return;
  }

  async getNotifications(startId: number | null): Promise<Notification[]> {
    type NotificationRow = {
      id: number;
      source_id: string;
      source_notification_id: string;
      category: string;
      title: string;
      body: string;
      timestamp: string;
      read: number;
      data: string;
    };

    let rows: NotificationRow[] = [];
    if (startId) {
      rows = await sql<NotificationRow[]>`
      SELECT id, source_id, source_notification_id, category, title, body, timestamp, read, data
        FROM notifications
        WHERE timestamp < (
          SELECT timestamp 
          from notifications
          where id = ${startId}
        )
        ORDER BY timestamp DESC
        LIMIT 50;
      `;
    } else {
      rows = await sql<NotificationRow[]>`
        SELECT id, source_id, source_notification_id, category, title, body, timestamp, read, data
        FROM notifications
        ORDER BY timestamp DESC
        LIMIT 50;
      `;
    }

    let notifications: Notification[] = [];

    for (const row of rows) {
      const notification = {
        ...JSON.parse(row.data),
        sourceNotificationId: row.source_notification_id,
        sourceId: row.source_id,
        title: row.title,
        body: row.body,
        timestamp: new Date(row.timestamp),
        read: row.read === 1,
        category: row.category,
      } as Notification;

      if (notification.category === "assignment") {
        notification.dueDate = new Date(notification.dueDate);
      }

      notifications.push(notification);
    }

    return notifications;
  }

  async addNotification(notification: Notification) {
    const {
      sourceNotificationId,
      sourceId,
      title,
      body,
      timestamp,
      read,
      category,
      ...data
    } = notification;

    await sql`
      INSERT INTO notifications (source_id, source_notification_id, category, title, body, timestamp, read, data)
      VALUES (${sourceId}, ${sourceNotificationId}, ${category}, ${title}, ${body}, ${timestamp.toISOString()}, ${read ? 1 : 0}, ${JSON.stringify(data)})
      ON CONFLICT DO NOTHING;
    `;
    return;
  }
}
