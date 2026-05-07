import UpdateCheckOutput from './updateCheckOutput.js';

/**
 * Defines the `/update/check` command used
 * to check for system and plugin updates
 */
const updateCheckCommand = {
  id: 'update-check',
  invoke: '/update/check',
  description: 'Used to check for system and plugin updates',
  output: {
    component: UpdateCheckOutput,
  },
} as const;

export default updateCheckCommand;
