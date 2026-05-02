import UsersOutput from './usersOutput.js';

/**
 * Defines the `/users` command
 * used to list all users
 */
const usersCommand = {
  id: 'users',
  invoke: '/users',
  description: 'Used to list all users',
  output: {
    component: UsersOutput,
  },
} as const;

export default usersCommand;
