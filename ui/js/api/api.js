class NotificationHubApi {
    async getNotificationCategories() {
        const response = await fetch("/api/categories", {
            method: "GET",
        });
        const body = await response.json();
        return body.categories;
    }
    async getNotifications() {
        const response = await fetch("/api/notifications", {
            method: "GET",
        });
        const body = await response.json();
        return body;
    }
    async getPlugins() {
        const response = await fetch("/api/plugins", {
            method: "GET",
        });
        const body = await response.json();
        return body;
    }
}
export const api = new NotificationHubApi();
