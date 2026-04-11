import { FunctionComponent, ReactElement } from 'react';
import { Block } from '../../types.js';
import { CommandBlock, ErrorBlock } from '../index.js';

/**
 * The `BlockSwitch` component props
 */
type Props = Block;

/**
 * Used to render the appropriate block
 * component based on its `type`
 *
 * @param props The component props
 * @returns The `BlockSwitch` component
 */
const BlockSwitch: FunctionComponent<Props> = (props): ReactElement<Props> => {
  const { type } = props;

  // Switch for the block type
  // and render each type of block
  switch (type) {
    case 'command': {
      return <CommandBlock {...props} />;
    }

    case 'error': {
      return <ErrorBlock {...props} />;
    }

    default: {
      throw new Error(`Unknown block type "${type}"`);
    }
  }
};

export default BlockSwitch;
