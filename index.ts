import { db } from "./db/index.ts";
import { updateNotifications } from "./notification.ts";
import { initPlugins } from "./plugin.ts";
import { NotificationCategories } from "./types/index.ts";
import { plugins } from "./plugin.ts";
import { pluginResponseItem, pluginsResponse } from "./types/responses.ts";
import home from "./ui/index.html";

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 3000,
  development: false,
  routes: {
    "/": home,
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
    "/api/plugin": async (req) => {
      let body: pluginResponseItem | undefined = undefined;
      const reqBody = await req.json();

      plugins.forEach((plugin) => {
        if (plugin.plugin.id === reqBody.pluginId) {
          body = plugin.plugin as pluginResponseItem;
        }
      });

      if (body) {
        return Response.json(body);
      } else {
        return new Response("Plugin not found", { status: 404 });
      }
    },
  },
});

console.log(`Server running on port ${server.port}`);

await initPlugins();

console.log("initialized plugins");

await updateNotifications();
console.log("fetched notifications");

setInterval(updateNotifications, 5 * 60 * 1000);
