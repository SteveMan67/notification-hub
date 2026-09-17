import { formatTimestamp, NotificationCard, } from "../components/notification-card.js";
import { Sort } from "./view-operations/sort.js";
import { Filter } from "./view-operations/filter.js";
export class NotificationPage {
    constructor(context) {
        this.context = context;
        this.notifications = [];
        this.activeOperations = {
            sort: "dateSort",
            filter: undefined,
        };
        this.operations = {
            dateSort: new Sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
            typeSort: new Sort((a, b) => a.category.localeCompare(b.category)),
            dueDateSort: new Sort((a, b) => {
                const aDueDate = a.category === "assignment" ? a.dueDate : undefined;
                const bDueDate = b.category === "assignment" ? b.dueDate : undefined;
                if (!aDueDate && !bDueDate)
                    return 0;
                if (!aDueDate)
                    return 1;
                if (!bDueDate)
                    return -1;
                return aDueDate.getTime() - bDueDate.getTime();
            }),
            uncompletedFilter: new Filter((a) => a.category === "assignment" &&
                a.dueDate.getTime() > new Date().getTime()),
            messageFilter: new Filter((a) => a.category === "message"),
            emailFilter: new Filter((a) => a.category === "email"),
            assignmentFilter: new Filter((a) => a.category === "assignment"),
            unreadFilter: new Filter((a) => !a.read),
        };
    }
    applyActiveOperations() {
        let notifications = this.notifications;
        if (this.activeOperations.filter) {
            notifications =
                this.operations[this.activeOperations.filter].apply(notifications);
        }
        if (this.activeOperations.sort) {
            notifications =
                this.operations[this.activeOperations.sort].apply(notifications);
        }
        return notifications;
    }
    renderNotifications() {
        const container = document.querySelector("#notifications");
        if (!container)
            return;
        container.innerHTML = "";
        const notifications = this.applyActiveOperations();
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
            const card = new NotificationCard({
                title: notification.title,
                category: notification.category,
                timestamp: notification.timestamp,
                read: notification.read,
                pluginName: "",
                info: [],
            });
            switch (notification.category) {
                case "assignment":
                    card.props.info = [
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
                    card.props.info = [notification.sender, body];
            }
            container.appendChild(card);
            if (i + 1 !== notifications.length) {
                const spacer = document.createElement("div");
                spacer.classList.add("spacer");
                container.appendChild(spacer);
            }
        }
    }
    setSort(sort) {
        if (!sort)
            return;
        this.activeOperations.sort = sort;
        this.renderNotifications();
    }
    setFilter(filter) {
        this.activeOperations.filter = filter;
        this.renderNotifications();
    }
    navigate(req) {
        if (req.sort) {
            this.setSort(req.sort);
        }
        if (req.filter) {
            this.setFilter(req.filter);
        }
        else {
            this.setFilter();
        }
    }
    async fetchNotifications() {
        const notifications = await this.context.api.getNotifications();
        this.notifications = notifications;
        this.notifications.forEach((notification) => {
            notification.timestamp = new Date(notification.timestamp);
            if (notification.category === "assignment") {
                notification.dueDate = new Date(notification.dueDate);
            }
        });
        this.renderNotifications();
    }
    async mount(container) {
        const response = await fetch("/pages/notifications.html");
        if (!response.ok) {
            throw new Error("Failed to load Notifications Page: " + response.status);
        }
        container.innerHTML = await response.text();
        await this.fetchNotifications();
    }
    async unmount() { }
}
