import { Api } from ".";
import { Notification, NotificationCategory, Plugin } from "../types";

class NotificationHubApi implements Api {
  async getNotificationCategories(): Promise<NotificationCategory[]> {
    const response = await fetch("/api/categories", {
      method: "GET",
    });

    const body = await response.json();
    return body as NotificationCategory[];
  }

  async getNotifications(): Promise<Notification[]> {
    const response = await fetch("/api/notifications", {
      method: "GET",
    });
    const body = await response.json();
    return body as Notification[];
  }

  async getPlugins(): Promise<Plugin[]> {
    const response = await fetch("/api/plugins", {
      method: "GET",
    });
    const body = await response.json();
    return body as Plugin[];
  }
}

export const api: Api = new NotificationHubApi();
