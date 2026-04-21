import ServerBackupsOutput from './serverBackupsOutput.js';

/**
 * Defines the `/server/backups` command
 * used to list all server backups
 */
const serverBackupsCommand = {
  id: 'server-backups',
  invoke: '/server/backups',
  description: 'Used to list all server backups',
  output: {
    component: ServerBackupsOutput,
    exitText: null,
  },
} as const;

export default serverBackupsCommand;
