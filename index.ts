import { db } from "./db/index.ts";
import { updateNotifications } from "./notification.ts";
import { initPlugins } from "./plugin.ts";
import { NotificationCategories } from "./types/index.ts";
import { plugins } from "./plugin.ts";
import { pluginResponseItem, pluginsResponse } from "./types/responses.ts";

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
    "/api/categories": async () => {
      const body = {
        categories: NotificationCategories,
      };
      return Response.json(body);
    },
    "/api/plugins": async () => {
      const body: pluginsResponse = [];

      plugins.forEach((plugin) => {
        body.push(plugin.plugin as pluginResponseItem);
      });
      return Response.json(body);
    },
    "/": Bun.file("./ui/index.html"),
    "/*": async (req) => {
      const url = new URL(req.url);
      const path = url.pathname;

      return new Response(Bun.file(`./ui${path}`));
    },
  },
});

console.log(`Server running on port ${server.port}`);
