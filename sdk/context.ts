export interface PluginContext {
  settings: PluginSettings;
  credentials: CredentialStore;
  http: HttpClient;
  logger: Logger;
}

export interface PluginSettings {
  get(key: string): Promise<string | undefined>;
}

export interface CredentialStore {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface HttpClient {
  get(url: string): Promise<Response>;
  post(url: string, body?: unknown): Promise<Response>;
}

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
