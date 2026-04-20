import ServerUsageOutput from './serverUsageOutput.js';

/**
 * Defines the `/server/usage` command used
 * to display the server CPU and memory usage
 */
const serverUsageCommand = {
  id: 'server-usage',
  invoke: '/server/usage',
  description: 'Used to display the server CPU and memory usage',
  output: {
    component: ServerUsageOutput,
    exitText: null,
  },
} as const;

export default serverUsageCommand;
