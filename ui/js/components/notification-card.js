export class NotificationCard extends HTMLElement {
    get notification() {
        return this._notification;
    }
    set notification(value) {
        this._notification = value;
        this.update();
    }
    update() { }
}
customElements.define("notification-card", NotificationCard);
