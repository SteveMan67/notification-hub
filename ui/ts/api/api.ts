import { Api } from ".";
import { Notification, Plugin } from "../types";

type NotificationCategoryResponse = {
  categories: string[];
};

export class NotificationHubApi implements Api {
  async getNotificationCategories(): Promise<string[]> {
    const response = await fetch("/api/categories", {
      method: "GET",
    });

    const body: NotificationCategoryResponse = await response.json();
    return body.categories;
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

  async getPlugin(pluginId: string): Promise<Plugin | undefined> {
    const response = await fetch("/api/plugin", {
      method: "POST",
      body: JSON.stringify({
        pluginId: pluginId,
      }),
    });

    if (response.ok) {
      const body = await response.json();

      return body as Plugin;
    }
    return;
  }
}

export const api: Api = new NotificationHubApi();
