import { ImapFlow } from "imapflow";
import type { Plugin, Notification } from "../types/index.ts";
import { definePlugin } from "../sdk/plugin.ts";
import type { PluginSetting } from "../sdk/settings-schema.ts";

type Inbox = {
  address: string;
  password: string;
  server: string;
};

const inboxes: Inbox[] = [];

function createInbox(address: string, password: string, server: string) {
  return {
    address,
    password,
    server,
  };
}

export default definePlugin({
  id: "email",
  name: "Email",
  version: "1.0",

  settings: {
    inboxes: {
      type: "object-list",
      label: "Email Addresses",
      fields: {
        address: {
          type: "text",
          label: "Email Address",
        },
        password: {
          type: "password",
          label: "Password",
        },
        server: {
          type: "select",
          label: "Server",
          description:
            "Gmail requires an App password to authenticate if 2FA is enabled. This can be found in your Google Account settings",
          options: [
            {
              label: "Gmail",
              value: "imap.gmail.com",
            },
            {
              label: "Outlook",
              value: "outlook.Microsoft365.com",
            },
          ],
        },
      },
    },
  },

  async initialize(ctx) {
    const inboxes = await ctx.settings.get<Inbox[]>("inboxes");

    if (!inboxes) {
      ctx.logger.warn("No inboxes found in configuration");
      return;
    }

    for (const inbox of inboxes) {
      createInbox(inbox.address, inbox.password, inbox.server);
    }
  },

  async getNotifications() {
    const notifications: Notification[] = [];
    for (const inbox of inboxes) {
      const client = new ImapFlow({
        host: inbox.server,
        port: 993,
        secure: true,
        auth: {
          user: inbox.address,
          pass: inbox.password,
        },
        logger: false,
      });
      await client.connect();

      let lock = await client.getMailboxLock("INBOX");

      try {
        const mailboxInfo = client.mailbox;
        const totalMessages =
          mailboxInfo && "exists" in mailboxInfo ? mailboxInfo.exists : 0;

        if (totalMessages == 0) continue;

        const startSeq = Math.max(1, totalMessages - 19);

        for await (let message of client.fetch(`${startSeq}:${totalMessages}`, {
          envelope: true,
          flags: true,
          internalDate: true,
          source: true,
        })) {
          const timestamp = new Date(message.internalDate as string);

          const isRead = message.flags ? message.flags.has("\\Seen") : false;

          const senderArray = message.envelope?.from;

          const senderEmail = senderArray?.[0]?.address || "";

          notifications.push({
            sourceNotificationId: message.uid.toString(),
            sourceId: "email",
            title: message.envelope?.subject as string,
            body: "",
            timestamp: timestamp,
            read: isRead,
            category: "email",
            sender: senderEmail,
            recipient: inbox.address,
            link: "",
          });
        }
      } finally {
        lock.release();
      }
    }

    return notifications;
  },
});
