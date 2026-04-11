import Logout from './logout.js';

/**
 * Defines the `/logout` command
 * used to log out of Homebridge
 */
const logoutCommand = {
  id: 'logout',
  usage: '/logout',
  description: 'Used to log out to Homebridge',
  run: '/logout',
  exitText: 'Logout successful',
  component: Logout,
} as const;

export default logoutCommand;
