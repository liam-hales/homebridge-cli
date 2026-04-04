import { FunctionComponent, ReactElement } from 'react';
import { ICommandBlock, IErrorBlock } from '../../types.js';
import { commandMap } from '../../commands/index.js';
import { CommandBlock, ErrorBlock } from '../index.js';

/**
 * The `BlockSwitch` component props
 */
type Props = (
  | Omit<ICommandBlock, 'id'>
  | Omit<IErrorBlock, 'id'>
);

/**
 * Used to render the appropriate block
 * component based on its `type`
 *
 * @param props The component props
 * @returns The `BlockSwitch` component
 */
const BlockSwitch: FunctionComponent<Props> = (props): ReactElement<Props> => {
  const { type, input } = props;

  // Switch for the block type
  // and render each type of block
  switch (type) {
    case 'command': {
      const { commandId } = props;
      const { component: Content } = commandMap[commandId];

      return (
        <CommandBlock input={input}>
          <Content />
        </CommandBlock>
      );
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
