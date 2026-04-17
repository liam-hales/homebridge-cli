import PairingsOutput from './pairingsOutput.js';

/**
 * Defines the `/pairings` command
 * used to list all pairings
 */
const pairingsCommand = {
  id: 'pairings',
  invoke: '/pairings',
  description: 'Used to list all pairings',
  output: {
    component: PairingsOutput,
    exitText: null,
  },
} as const;

export default pairingsCommand;
