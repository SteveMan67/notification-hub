import type { Logger } from "./context.ts";

export class NotificationLogger implements Logger {
  constructor(private pluginId: string) {}
  info(message: string) {
    console.log(`[${this.pluginId}] ${message}`);
  }
  warn(message: string) {
    console.warn(`[${this.pluginId}] ${message}`);
  }
  error(message: string) {
    console.error(`[${this.pluginId}] ${message}`);
  }
}
