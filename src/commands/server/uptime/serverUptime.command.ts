import ServerUptimeOutput from './serverUptimeOutput.js';

/**
 * Defines the `/server/uptime` command used
 * to display the server and process uptime
 */
const serverUptimeCommand = {
  id: 'server-uptime',
  invoke: '/server/uptime',
  description: 'Used to display the server and process uptime',
  output: {
    component: ServerUptimeOutput,
  },
} as const;

export default serverUptimeCommand;
