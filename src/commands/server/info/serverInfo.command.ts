import ServerInfoOutput from './serverInfoOutput.js';

/**
 * Defines the `/server/info` command
 * used to display the server info
 */
const serverInfoCommand = {
  id: 'server-info',
  invoke: '/server/info',
  description: 'Used to display the server info',
  output: {
    component: ServerInfoOutput,
    exitText: null,
  },
} as const;

export default serverInfoCommand;
