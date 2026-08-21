import { SQL } from "bun";
import type { Database } from "../db/index.ts";
import type { Category, Notification } from "../types/index.ts";

const sql = new SQL(process.env.DATABASE_URL as string);

await sql`
DROP TABLE notifications;
`;

await sql`
  CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    source_id TEXT NOT NULL,
    source_notification_id TEXT NOT NULL,
    category TEXT,

    title TEXT NOT NULL,
    body TEXT,
    timestamp timestamp NOT NULL,

    read BOOLEAN NOT NULL DEFAULT FALSE,

    data JSONB NOT NULL DEFAULT '{}',

    UNIQUE (source_id, source_notification_id)
  )
`;

export class psql implements Database {
  async getNotifications(startId: number | null): Promise<Notification[]> {
    type NotificationRow = {
      id: number;
      source_id: string;
      source_notification_id: string;
      category: string;
      title: string;
      body: string;
      timestamp: Date;
      read: boolean;
      data: Record<string, unknown>;
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
        ORDER BY timestamp DESC, id DESC
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
        sourceNotificationId: row.source_notification_id,
        sourceId: row.source_id,
        title: row.title,
        body: row.body,
        timestamp: row.timestamp,
        read: row.read,
        ...row.data,
      } as Notification;

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
      VALUES (${sourceId}, ${sourceNotificationId}, ${category}, ${title}, ${body}, ${timestamp}, ${read}, ${data})
      ON CONFLICT DO NOTHING;
    `;
    return;
  }
}
