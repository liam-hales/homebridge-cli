import { commands } from './index.js';
import { Map } from '../types.js';

/**
 * Used to describe all commands
 */
export type Command = typeof commands[number];

/**
 * Used to describe the map between the
 * command `id` and the corresponding command
 */
export type CommandMap = Map<Command, 'id'>;
