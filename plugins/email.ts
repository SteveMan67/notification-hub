import { ImapFlow } from "imapflow";
import type { Plugin, Notification } from "../types/index.ts";

type Inbox = {
  address: string;
  password: string;
  host: string;
};

const inboxes: Inbox[] = [];

function createInbox(address: string, password: string, host: string) {
  return {
    address,
    password,
    host,
  };
}

const personalEmail = createInbox(
  "timslawncare.ok@gmail.com",
  process.env.PERSONAL_EMAIL_APP_PASSWORD as string,
  "imap.gmail.com",
);

const acaEmail = createInbox(
  "poppt@acatulsa.org",
  process.env.SCHOOL_EMAIL_PASSWORD as string,
  "imap.gmail.com",
);

inboxes.push(acaEmail);
inboxes.push(personalEmail);

const plugin: Plugin = {
  id: "email",
  name: "Email",

  async initialize() {
    console.log("initialized");
    return;
  },

  async getNotifications() {
    const notifications: Notification[] = [];
    for (const inbox of inboxes) {
      const client = new ImapFlow({
        host: inbox.host,
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
            sourceId: plugin.id,
            title: message.envelope?.subject as string,
            body: "",
            timestamp: timestamp,
            read: isRead,
            category: "email",
            sender: senderEmail,
            recipient: inbox.address,
          });
        }
      } finally {
        lock.release();
      }
    }

    return notifications;
  },
};

export default plugin;
