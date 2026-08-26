import type { Notification, NotificationCategory } from "../types";
import { psql } from "./database.ts";

export interface Database {
  getPluginSetting(pluginId: string, key: string): Promise<string | undefined>;
  setPluginSetting(pluginId: string, key: string, value: string): Promise<void>;
  deletePluginSetting(pluginId: string, key: string): Promise<void>;
  getNotifications(startId: number | null): Promise<Notification[]>;
  addNotification(notification: Notification): Promise<void>;
}

export const db: Database = new psql();
