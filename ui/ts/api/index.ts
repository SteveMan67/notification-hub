import { NotificationCategory, Notification, Plugin } from "../types";

export interface Api {
  getNotificationCategories(): Promise<string[]>;
  getNotifications(): Promise<Notification[]>;
  getPlugins(): Promise<Plugin[]>;
}
