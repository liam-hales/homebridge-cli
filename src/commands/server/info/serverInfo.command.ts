import ServerInfo from './serverInfo.js';

/**
 * Defines the `/server/info` command used
 * to display the Homebridge server info
 */
const serverInfoCommand = {
  id: 'server-info',
  usage: '/server/info',
  description: 'Used to display the Homebridge server info',
  run: '/server/info',
  exitText: null,
  component: ServerInfo,
} as const;

export default serverInfoCommand;
