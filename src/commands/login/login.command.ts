import Login from './login.js';

/**
 * Defines the `/login` command
 * used to log in to Homebridge
 */
const loginCommand = {
  id: 'login',
  usage: '/login',
  description: 'Used to log in to Homebridge',
  run: '/login',
  exitText: 'Login credentials set, check login status above',
  component: Login,
} as const;

export default loginCommand;
