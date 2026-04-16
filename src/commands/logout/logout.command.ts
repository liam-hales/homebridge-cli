import LogoutOutput from './logoutOutput.js';

/**
 * Defines the `/logout` command
 * used to log out of Homebridge
 */
const logoutCommand = {
  id: 'logout',
  invoke: '/logout',
  description: 'Used to log out to Homebridge',
  output: {
    component: LogoutOutput,
    exitText: 'Logout successful',
  },
} as const;

export default logoutCommand;
