/**
 * Defines the `/login` command
 * used to log in to Homebridge
 */
const loginCommand = {
  id: 'login',
  usage: '/login',
  description: 'Used to log in to Homebridge',
  run: '/login',
} as const;

export default loginCommand;
