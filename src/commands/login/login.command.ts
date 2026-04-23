import LoginOutput from './loginOutput.js';

/**
 * Defines the `/login` command used
 * to log in and store credentials
 */
const loginCommand = {
  id: 'login',
  invoke: '/login',
  description: 'Used to log in and store credentials',
  output: {
    component: LoginOutput,
    exitText: 'Login credentials set, check login status above',
  },
} as const;

export default loginCommand;
