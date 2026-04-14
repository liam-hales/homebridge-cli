import InitOutput from './initOutput.js';

/**
 * Defines the `/init` command used to
 * connect to a Homebridge server
 */
const initCommand = {
  id: 'init',
  usage: '/init',
  description: 'Used to connect to a Homebridge server',
  run: '/init',
  output: {
    component: InitOutput,
    exitText: 'Setup complete, config set',
  },
} as const;

export default initCommand;
