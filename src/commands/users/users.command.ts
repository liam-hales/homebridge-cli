import UsersOutput from './usersOutput.js';

/**
 * Defines the `/users` command
 * used to list all users
 */
const usersCommand = {
  id: 'users',
  usage: '/users',
  description: 'Used to list all users',
  run: '/users',
  output: {
    component: UsersOutput,
    exitText: null,
  },
} as const;

export default usersCommand;
