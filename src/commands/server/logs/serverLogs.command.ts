import ServerLogsOutput from './serverLogsOutput.js';

/**
 * Defines the `/server/logs` command used
 * to stream the server logs
 */
const serverLogsCommand = {
  id: 'server-logs',
  invoke: '/server/logs',
  description: 'Used to stream the server logs',
  output: {
    component: ServerLogsOutput,
  },
} as const;

export default serverLogsCommand;
