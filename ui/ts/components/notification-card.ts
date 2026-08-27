import type { Notification } from "../types";

export class NotificationCard extends HTMLElement {
  private _notification?: Notification;

  get notification(): Notification | undefined {
    return this._notification;
  }

  set notification(value: Notification | undefined) {
    this._notification = value;
    this.update();
  }

  private update() {}
}

customElements.define("notification-card", NotificationCard);
