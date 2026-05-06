import ServerNetworkOutput from './serverNetworkOutput.js';

/**
 * Defines the `/server/network` command used
 * to display the server network info
 */
const serverNetworkCommand = {
  id: 'server-network',
  invoke: '/server/network',
  description: 'Used to display the server network info',
  output: {
    component: ServerNetworkOutput,
  },
} as const;

export default serverNetworkCommand;
