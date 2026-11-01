import { definePlugin } from "../sdk/plugin";
import { Notification } from "../types";

export default definePlugin({
  id: "demo",
  name: "Demo Plugin",
  description: "this is to show how notfications work.",
  version: "1.0",

  settings: {},

  async initialize(ctx) {},

  async getNotifications(ctx) {
    // get notifications here

    const notification: Notification = {
      sourceNotificationId: "1",
      sourceId: "demo",
      title: "This message was fetched from a notification",
      body: "hello world or lorem ipsum or whatever",
      timestamp: new Date(),
      read: false,
      category: "message",
      sender: "Demo Plugin",
      link: "",
    };

    const listOfNotifications = [notification];

    return listOfNotifications;
  },
});
