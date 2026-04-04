import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';

/**
 * The `CommandBlock` component props
 */
interface Props {
  readonly input: string;
  readonly children: ReactElement;
}

/**
 * Used to render the command block
 * which wraps a command component
 *
 * @param props The component props
 * @returns The `CommandBlock` component
 */
const CommandBlock: FunctionComponent<Props> = ({ input, children }): ReactElement<Props> => {
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
      {children}
    </Box>
  );
};

export default CommandBlock;
