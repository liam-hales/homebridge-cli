import LoginOutput from './loginOutput.js';

/**
 * Defines the `/login` command
 * used to log in to Homebridge
 */
const loginCommand = {
  id: 'login',
  usage: '/login',
  description: 'Used to log in to Homebridge',
  run: '/login',
  output: {
    component: LoginOutput,
    exitText: 'Login credentials set, check login status above',
  },
} as const;

export default loginCommand;
