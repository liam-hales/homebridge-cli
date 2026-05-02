import ConfigBackupsOutput from './configBackupsOutput.js';

/**
 * Defines the `/config/backups` command
 * used to list all config backups
 */
const configBackupsCommand = {
  id: 'config-backups',
  invoke: '/config/backups',
  description: 'Used to list all config backups',
  output: {
    component: ConfigBackupsOutput,
  },
} as const;

export default configBackupsCommand;
