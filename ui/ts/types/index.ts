export const NotificationCategories = [
  "message",
  "email",
  "assignment",
] as const;

export type NotificationCategory = (typeof NotificationCategories)[number];

export type SettingType =
  | "text"
  | "password"
  | "number"
  | "boolean"
  | "select"
  | "object-list";

export interface Plugin {
  id: string;
  name: string;
  description?: string;
  version: string;

  settings: Record<string, PluginSetting>;
}

export interface PluginSetting {
  type: SettingType;
  label: string;
  description?: string;
  required?: boolean;
  secret?: boolean;
  options?: {
    label: string;
    value: string;
  }[];

  fields?: Record<string, PluginSetting>;
}

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
