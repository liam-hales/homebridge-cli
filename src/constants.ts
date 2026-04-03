/**
 * Describes the different colours
 * using their HEX values
 */
export const colours = {
  white: '#ffffff',
  purple: '#a058d1',
  lightGrey: '#c7c7c7',
  grey: '#7a7a7a',
  darkGrey: '#4a4a4a',
} as const;

/**
 * Describes all possible CLI
 * commands the user can execute
 */
export const commands = [
  {
    id: 'init',
    usage: '/init <hostname>',
    description: 'Used to connect to a Homebridge server',
    run: '/init',
  },
  {
    id: 'login',
    usage: '/login',
    description: 'Used to login to Homebridge',
    run: '/login',
  },
  {
    id: 'logout',
    usage: '/logout',
    description: 'Used to logout of Homebridge and clear saved credentials',
    run: '/logout',
  },
] as const;
