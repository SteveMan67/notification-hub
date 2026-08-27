import { env } from "bun";
import { definePlugin } from "../sdk";

const APP_TOKEN = process.env.SLACK_APP_TOKEN;

interface socketResponse {
  ok: boolean;
  error?: string;
  url?: URL;
}

export default definePlugin({
  id: "slack",
  name: "Slack",
  version: "Slack",

  async initialize(ctx) {
    const response = await fetch(
      "https://slack.com/api/apps.connections.open",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${APP_TOKEN}`,
        },
      },
    );

    const data: any = (await response.json()) as any;

    if (!data.ok) {
      ctx.logger.error(`slack: ${data.error}`);
    }

    if (!data.url) {
      ctx.logger.error("slack returned no url");
    }

    const socket = new WebSocket(data.url);

    socket.addEventListener("open", () => {
      ctx.logger.info("slack connected");
    });

    socket.addEventListener("message", async (event) => {
      const envelope = JSON.parse(event.data);

      if (envelope.envelope_id) {
        socket.send(
          JSON.stringify({
            envelope_id: envelope.envelope_id,
          }),
        );
      }

      if (
        envelope.type !== "events_api" ||
        envelope.payload?.event?.type !== "message"
      )
        return;

      ctx.logger.info("recieved slack event");

      const message = envelope.payload.event;

      await ctx.addNotification({
        sourceId: "slack",
        sourceNotificationId: envelope.payload.event.event_id,
        title: "Slack",
        body: message.text,
        timestamp: new Date(Number(message.ts.split(".")[0]) * 1000),
        read: false,
        category: "message",
        link: "",
        sender: "slack ig",
      });
    });

    socket.addEventListener("close", () => {
      ctx.logger.warn("socket closed");
    });

    socket.addEventListener("error", (e) => {
      ctx.logger.error(`WebSocket error: ${e}`);
    });
  },

  async getNotifications(ctx) {
    return [];
  },
});
