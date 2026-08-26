export interface PluginContext {
  settings: PluginSettings;
  logger: Logger;
}

export interface PluginSettings {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
