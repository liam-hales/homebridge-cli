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
  },
} as const;

export default pairingsCommand;
