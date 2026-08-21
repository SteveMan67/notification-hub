import type { Notification, Category } from "../types/index.ts";
import { psql } from "./database.ts";

export interface Database {
  getNotifications(startId: number | null): Promise<Notification[]>;
  addNotification(notification: Notification): Promise<void>;
}

export const db: Database = new psql();
