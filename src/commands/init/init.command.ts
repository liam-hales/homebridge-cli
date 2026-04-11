import Init from './init.js';

/**
 * Defines the `/init` command used to
 * connect to a Homebridge server
 */
const initCommand = {
  id: 'init',
  usage: '/init',
  description: 'Used to connect to a Homebridge server',
  run: '/init',
  exitText: 'Setup complete, config set',
  component: Init,
} as const;

export default initCommand;
