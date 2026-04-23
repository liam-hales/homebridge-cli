import { userSchema, serverInfoSchema, nodejsInfoSchema, pairingsSchema, configBackupsSchema, serverBackupSchema, cpuUsageSchema, memoryUsageSchema, installedPluginsSchema } from './schemas/index.js';
import { z } from 'zod';

/**
 * Describes the API request options
 *
 * - Generic type `T` for the request body
 */
export type RequestOptions<T extends object = never> = GetRequestOptions | PostRequestOptions<T>;

/**
 * Describes the API request options
 * for a `GET` request
 */
export interface GetRequestOptions {
  readonly method: 'get';
  readonly endpoint: string;
}

/**
 * Describes the API request options
 * for a `POST` request
 *
 * - Generic type `T` for the request body
 */
export interface PostRequestOptions<T extends object> {
  readonly method: 'post';
  readonly endpoint: string;
  readonly body: T;
}

/**
 * Describes the user inferred
 * by the `userSchema`
 */
export type User = z.infer<typeof userSchema>;

/**
 * Describes the server info inferred
 * by the `serverInfoSchema`
 */
export type ServerInfo = z.infer<typeof serverInfoSchema>;

/**
 * Describes the server backup inferred
 * by the `serverBackupSchema`
 */
export type ServerBackup = z.infer<typeof serverBackupSchema>;

/**
 * Describes the Node.js info inferred
 * by the `nodejsInfoSchema`
 */
export type NodejsInfo = z.infer<typeof nodejsInfoSchema>;

/**
 * Describes the pairings inferred
 * by the `pairingsSchema`
 */
export type Pairing = z.infer<typeof pairingsSchema>;

/**
 * Describes the config backup inferred
 * by the `configBackupsSchema`
 */
export type ConfigBackup = z.infer<typeof configBackupsSchema>;

/**
 * Describes the CPU usage inferred
 * by the `cpuUsageSchema`
 */
export type CpuUsage = z.infer<typeof cpuUsageSchema>;

/**
 * Describes the memory usage inferred
 * by the `memoryUsageSchema`
 */
export type MemoryUsage = z.infer<typeof memoryUsageSchema>;

/**
 * Describes the installed plugin inferred
 * by the `installedPluginsSchema`
 */
export type InstalledPlugin = z.infer<typeof installedPluginsSchema>;

/**
 * Describes the config data returned
 * by the `GET /api/config-editor` endpoint
 */
export interface ConfigData {
  readonly bridge: {
    readonly name: string;
    readonly username: string;
    readonly port: number;
    readonly pin: string;
    readonly advertiser: string;
    readonly bind: string[];
  };
  readonly accessories: Record<string, unknown>[];
  readonly platforms: Record<string, unknown>[];
}
