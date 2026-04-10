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
  component: Init,
} as const;

export default initCommand;
