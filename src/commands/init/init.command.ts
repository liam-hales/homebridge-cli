import InitOutput from './initOutput.js';

/**
 * Defines the `/init` command used to
 * connect to a Homebridge server
 */
const initCommand = {
  id: 'init',
  invoke: '/init',
  description: 'Used to connect to a Homebridge server',
  output: {
    component: InitOutput,
    exitText: 'Setup complete, config set',
  },
} as const;

export default initCommand;
