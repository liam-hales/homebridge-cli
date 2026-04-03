/**
 * Describes the different colours
 * using their HEX values
 */
export const colours = {
  white: '#ffffff',
  purple: '#a058d1',
  lightGrey: '#c7c7c7',
  darkGrey: '#4a4a4a',
} as const;

/**
 * Describes all possible CLI
 * commands the user can execute
 */
export const commands = [
  {
    name: '/init <hostname>',
    description: 'Used to connect to a Homebridge server',
    run: '/init',
  },
  {
    name: '/login',
    description: 'Used to login to Homebridge',
    run: '/login',
  },
  {
    name: '/logout',
    description: 'Used to logout of Homebridge and clear saved credentials',
    run: '/logout',
  },
] as const;
