import ChildBridgesOutput from './childBridgesOutput.js';

/**
 * Defines the `/child-bridges` command
 * used to list all child bridges
 */
const childBridgesCommand = {
  id: 'child-bridges',
  invoke: '/child-bridges',
  description: 'Used to list all child bridges',
  output: {
    component: ChildBridgesOutput,
    exitText: null,
  },
} as const;

export default childBridgesCommand;
