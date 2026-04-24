import ServerRestartOutput from './serverRestartOutput.js';

/**
 * Defines the `/server/restart` command
 * used to restart the server
 */
const serverRestartCommand = {
  id: 'server-restart',
  invoke: '/server/restart',
  description: 'Used to restart the server',
  output: {
    component: ServerRestartOutput,
    exitText: 'Restart command sent — check server status above',
  },
} as const;

export default serverRestartCommand;
