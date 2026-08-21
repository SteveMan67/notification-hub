import { db } from "./db/index.ts";
import { updateNotifications } from "./notification.ts";
import { initPlugins } from "./plugin.ts";

await initPlugins();

console.log("initialized plugins");

await updateNotifications();
console.log("fetched notifications");

setInterval(updateNotifications, 5 * 60 * 1000);

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/notifications": async () => {
      const notifications = await db.getNotifications(null);
      return Response.json(notifications);
    },
  },
});

console.log(`Server running on port ${server.port}`);
