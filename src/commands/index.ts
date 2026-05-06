import { initCommand } from './init/index.js';
import { loginCommand } from './login/index.js';
import { logoutCommand } from './logout/index.js';
import { serverInfoCommand } from './server/info/index.js';
import { serverNetworkCommand } from './server/network/index.js';
import { serverUsageCommand } from './server/usage/index.js';
import { serverUptimeCommand } from './server/uptime/index.js';
import { serverBackupsCommand } from './server/backups/index.js';
import { serverRestartCommand } from './server/restart/index.js';
import { pairingsCommand } from './pairings/index.js';
import { usersCommand } from './users/index.js';
import { configCommand } from './config/index.js';
import { configBackupsCommand } from './config/backups/index.js';
import { installedPluginsCommand } from './plugins/installed/index.js';
import { childBridgesCommand } from './childBridges/index.js';
import { accessoriesCommand } from './accessories/index.js';
import { CommandMap } from './types.js';

/**
 * Describes all possible CLI
 * commands the user can execute
 */
export const commands = [
  initCommand,
  loginCommand,
  logoutCommand,
  serverInfoCommand,
  serverNetworkCommand,
  serverUsageCommand,
  serverUptimeCommand,
  serverBackupsCommand,
  serverRestartCommand,
  pairingsCommand,
  usersCommand,
  configCommand,
  configBackupsCommand,
  installedPluginsCommand,
  childBridgesCommand,
  accessoriesCommand,
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
