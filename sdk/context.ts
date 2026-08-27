import type { Notification } from "../types";

export interface PluginContext {
  settings: PluginSettings;
  logger: Logger;
  addNotification(notification: Notification): Promise<void>;
}

export interface PluginSettings {
  get<T = "string">(key: string): Promise<T | undefined>;
  set<T = "string">(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
