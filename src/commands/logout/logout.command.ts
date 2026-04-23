import LogoutOutput from './logoutOutput.js';

/**
 * Defines the `/logout` command used
 * to log out and clear credentials
 */
const logoutCommand = {
  id: 'logout',
  invoke: '/logout',
  description: 'Used to log out and clear credentials',
  output: {
    component: LogoutOutput,
    exitText: 'Logout successful',
  },
} as const;

export default logoutCommand;
