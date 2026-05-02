import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { commandMap } from '../../commands/index.js';
import { useApp } from '../../hooks/index.js';
import { ICommandBlock } from '../../types.js';

/**
 * The `CommandBlock` component props
 */
type Props = Omit<ICommandBlock, 'type'>;

/**
 * Used to render the command block
 * which wraps a command component
 *
 * @param props The component props
 * @returns The `CommandBlock` component
 */
const CommandBlock: FunctionComponent<Props> = ({ id, input, exitText, commandId }): ReactElement<Props> => {
  const { activeBlockId } = useApp();

  const { output } = commandMap[commandId];
  const { component: Output } = output;

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      <Text
        color={colours.lightGrey}
        backgroundColor={colours.darkGrey}
        underline={true}
      >
        {` ❯ ${input} `}
      </Text>
      {
        (id === activeBlockId)
          ? <Output />
          : (
              <Box
                flexDirection="column"
                marginLeft={1}
              >
                <Text color={colours.lightGrey}>
                  {`└─ ${exitText ?? 'Exited'}`}
                </Text>
              </Box>
            )
      }
    </Box>
  );
};

export default CommandBlock;
