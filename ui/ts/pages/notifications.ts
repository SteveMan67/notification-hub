import { Page } from "../page-manager";
import { Notification, NotificationCategory } from "../types";
import { formatTimestamp } from "../components/notification-card.js";

export type SortType = "date" | "type" | "due";

export interface Filter {
  type: NotificationCategory | "none";
  sort: SortType;
  isAscending: boolean;
}

interface NotificationsPage extends Page {
  setFilter(filter: string | "none"): void;
  setSort(sort: SortType): void;
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
    let notifications = this.notifications.filter((notification) => {
      return (
        this.filter.type === "none" ||
        notification.category === this.filter.type
      );
    });

    notifications.sort((a, b) => {
      let comparison: number;

      switch (this.filter.sort) {
        case "date":
          comparison = a.timestamp.getTime() - b.timestamp.getTime();
          break;
        case "type":
          comparison = a.category.localeCompare(b.category);
          break;
        case "due":
          if (a.category !== "assignment" || b.category !== "assignment") {
            comparison = a.timestamp.getTime() - b.timestamp.getTime();
          } else {
            comparison = a.dueDate.getTime() - b.dueDate.getTime();
          }
      }

      return this.filter.isAscending ? comparison : -comparison;
    });

    return notifications;
  }

  private renderNotifications() {
    const container = document.querySelector("#notifications");

    if (!container) return;

    container.innerHTML = "";

    const notifications = this.getSortedNotifications();

    if (!notifications.length) {
      const div = document.createElement("div");

      div.classList.add("no-notifications");

      div.innerHTML = `
        <p>Nothing to see here!</p>
      `;

      container.appendChild(div);
    }

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
            notification.dueDate.getTime() > new Date().getTime()
              ? "Due " + formatTimestamp(notification.dueDate)
              : "Completed " + formatTimestamp(notification.dueDate),
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

  setSort(sort: SortType) {
    this.filter.sort = sort;

    this.renderNotifications();
  }

  setFilter(filter: NotificationCategory | "none") {
    console.log(filter);
    this.filter.type = filter;

    this.renderNotifications();
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
    this.notifications.forEach((notification) => {
      notification.timestamp = new Date(notification.timestamp);

      if (notification.category === "assignment") {
        notification.dueDate = new Date(notification.dueDate);
      }
    });
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
