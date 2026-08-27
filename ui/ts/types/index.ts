export const NotificationCategories = [
  "message",
  "email",
  "assignment",
] as const;

export type NotificationCategory = (typeof NotificationCategories)[number];

export type NotificationBase = {
  sourceNotificationId: string;
  sourceId: string;

  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  link: string;
};

interface AssignmentNotification extends NotificationBase {
  category: "assignment";

  dueDate: Date;
  class: string;
}

interface MessageNotification extends NotificationBase {
  category: "message";

  sender: string;
}

interface EmailNotification extends NotificationBase {
  category: "email";

  sender: string;
  recipient: string;
}

export type Notification =
  | AssignmentNotification
  | MessageNotification
  | EmailNotification;
