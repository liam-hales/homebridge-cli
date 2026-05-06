import AccessoriesOutput from './accessoriesOutput.js';

/**
 * Defines the `/accessories` command used
 * to list and interact with accessories
 */
const accessoriesCommand = {
  id: 'accessories',
  invoke: '/accessories',
  description: 'Used to list and interact with accessories',
  output: {
    component: AccessoriesOutput,
  },
} as const;

export default accessoriesCommand;
