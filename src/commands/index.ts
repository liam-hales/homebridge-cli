import { initCommand } from './init/index.js';
import { loginCommand } from './login/index.js';
import { CommandMap } from './types.js';

/**
 * Describes all possible CLI
 * commands the user can execute
 */
export const commands = [
  initCommand,
  loginCommand,
];

/**
 * Describes the map between the command `id`
 * and the corresponding command
 */
export const commandMap = commands.reduce<CommandMap>((map, command) => {
  const { id } = command;
  return {
    ...map,
    [id]: command,
  };
}, {} as CommandMap);

export * from './types.js';
