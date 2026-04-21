import ConfigOutput from './configOutput.js';

/**
 * Defines the `/config` command used
 * to display the config JSON data
 */
const configCommand = {
  id: 'config',
  invoke: '/config',
  description: 'Used to display the config JSON data',
  output: {
    component: ConfigOutput,
    exitText: null,
  },
} as const;

export default configCommand;
