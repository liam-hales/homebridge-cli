import { Command } from './commands/index.js';

/**
 * Describes the different
 * modes the app can be in
 */
export type AppMode = 'starting' | 'checking' | 'idle' | 'running';

/**
 * Describes the different
 * server statuses
 */
export type ServerStatus = 'up' | 'down';

/**
 * Describes the different
 * Homebridge API statuses
 */
export type ApiStatus = 'up' | 'down';

/**
 * Describes the different
 * login statuses
 */
export type LoginStatus = 'authenticated' | 'failed';

/**
 * The union type for
 * all block types
 */
export type Block = ICommandBlock | IErrorBlock;

/**
 * Used to create a map type from a
 * given object type and index key
 *
 * - Generic type `T` for the type to map
 * - Generic type `U` for the index key
 */
export type Map<
  T extends Readonly<Record<U, string>>,
  U extends keyof T,
> = {
  [K in T[U]]: Extract<
    T,
    Readonly<Record<U, K>>
  >;
};

/**
 * Describes the `config.json` file from
 * the `.homebridge-cli` directory
 */
export interface Config {
  readonly filePath: string;
  readonly host: string;
  readonly port: number;
}

/**
 * Describes the user credentials
 * used to log in to Homebridge
 */
export interface Credentials {
  readonly username: string;
  readonly password: string;
}

/**
 * Describes the command block used to
 * store data about an executed command
 */
export interface ICommandBlock {
  readonly type: 'command';
  readonly id: string;
  readonly input: string;
  readonly commandId: Command['id'];
}

/**
 * Describes the error block used to
 * store data about an execution error
 */
export interface IErrorBlock {
  readonly type: 'error';
  readonly id: string;
  readonly input: string;
  readonly message: string;
}
