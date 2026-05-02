import InstalledPluginsOutput from './installedPluginsOutput.js';

/**
 * Defines the `/plugins/installed` command
 * used to list all installed plugins
 */
const installedPluginsCommand = {
  id: 'plugins-installed',
  invoke: '/plugins/installed',
  description: 'Used to list all installed plugins',
  output: {
    component: InstalledPluginsOutput,
  },
} as const;

export default installedPluginsCommand;
