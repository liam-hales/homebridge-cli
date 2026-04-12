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
const CommandBlock: FunctionComponent<Props> = ({ id, input, didUserClose, commandId }): ReactElement<Props> => {
  const { activeBlockId } = useApp();
  const { component: Content, exitText } = commandMap[commandId];

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
          ? <Content />
          : (
              <Box
                flexDirection="column"
                marginLeft={1}
              >
                {
                  (didUserClose === true)
                    ? (
                        <Text color={colours.lightGrey}>
                          └─ Closed by user
                        </Text>
                      )
                    : (
                        <Text color={colours.lightGrey}>
                          {`└─ ${exitText ?? 'Exited'}`}
                        </Text>
                      )
                }
              </Box>
            )
      }
    </Box>
  );
};

export default CommandBlock;
