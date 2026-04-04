import { initCommand } from './init/index.js';
import { loginCommand } from './login/index.js';

/**
 * Describes all possible CLI
 * commands the user can execute
 */
export const commands = [
  initCommand,
  loginCommand,
];
