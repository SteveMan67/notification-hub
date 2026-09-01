import { NotificationCategory, Notification, Plugin } from "../types";

export interface Api {
  getNotificationCategories(): Promise<NotificationCategory[]>;
  getNotifications(): Promise<Notification[]>;
  getPlugins(): Promise<Plugin[]>;
}
