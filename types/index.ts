export type Category = "message" | "email" | "assignment" | "grade" | "other";

export type NotificationBase = {
  sourceNotificationId: string;
  sourceId: string;

  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
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

export interface Plugin {
  id: string;
  name: string;

  initialize(): any;
  login(): Promise<void>;
  isLoggedIn(): Promise<Boolean>;
  getNotifications(): Promise<Notification[]>;
}
