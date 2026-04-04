import { Command } from './commands/index.js';

/**
 * Describes the different
 * modes the app can be in
 */
export type AppMode = 'idle' | 'running';

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
