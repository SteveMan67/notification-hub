import { Page } from "../page-manager";
import { Notification, NotificationCategory } from "../types";
import { formatTimestamp } from "../components/notification-card.js";

export type SortType = "date" | "type";

export interface Filter {
  type: NotificationCategory | "none";
  sort: SortType;
  isAscending: boolean;
}

interface NotificationsPage extends Page {
  fetchNotifications(): Promise<void>;
}

export class NotificationPage implements NotificationsPage {
  private notifications: Notification[] = [];

  private filter: Filter = {
    type: "none",
    sort: "date",
    isAscending: false,
  };

  private getSortedNotifications(): Notification[] {
    console.log(this.filter);
    let notifications = [...this.notifications];

    notifications.sort((a, b) => {
      let comparison: number;

      switch (this.filter.sort) {
        case "date":
          comparison = a.timestamp.getTime() - b.timestamp.getTime();
          break;
        case "type":
          comparison = a.category.localeCompare(b.category);
      }

      return this.filter.isAscending ? comparison : -comparison;
    });

    return notifications.filter(
      (f) => f.category === this.filter.type || this.filter.type === "none",
    );
  }

  private renderNotifications() {
    const container = document.querySelector("#notifications");

    console.log(container);

    if (!container) return;

    container.innerHTML = "";

    const notifications = this.getSortedNotifications();

    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];
      const card = document.createElement("notification-card");

      card.title = notification.title;
      card.category = notification.category;
      card.timestamp = notification.timestamp;

      switch (notification.category) {
        case "assignment":
          card.info = [
            notification.class,
            formatTimestamp(new Date(notification.dueDate)),
          ];
          break;
        case "message":
          let body = notification.body;

          if (body.length > 25) {
            body = body.slice(0, 25) + "...";
          }

          body = body.replace(/<[^>]*>/g, "");

          card.info = [notification.sender, body];
      }

      container.appendChild(card);

      if (i + 1 !== notifications.length) {
        const spacer = document.createElement("div");

        spacer.classList.add("spacer");

        container.appendChild(spacer);
      }
    }
  }

  async fetchNotifications(): Promise<void> {
    const response = await fetch("/api/notifications", {
      method: "GET",
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch notifications, " + body.error);
    }

    const notifications = body;

    this.notifications = notifications;
    this.notifications.map(
      (notification) =>
        (notification.timestamp = new Date(notification.timestamp)),
    );
    console.log(this.notifications);
    this.notifications = this.getSortedNotifications();
    this.renderNotifications();
  }

  async mount(container: HTMLElement) {
    const response = await fetch("/pages/notifications.html");

    if (!response.ok) {
      throw new Error("Failed to load Notifications Page: " + response.status);
    }

    container.innerHTML = await response.text();

    await this.fetchNotifications();
  }

  async unmount() {}
}
