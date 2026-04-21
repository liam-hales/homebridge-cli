import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { IErrorBlock } from '../../types.js';

/**
 * The `ErrorBlock` component props
 */
type Props = Omit<IErrorBlock, 'type'>;

/**
 * Used to render the error block
 *
 * @param props The component props
 * @returns The `ErrorBlock` component
 */
const ErrorBlock: FunctionComponent<Props> = ({ input, message }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      rowGap={1}
    >
      <Text
        color={colours.white}
        backgroundColor={colours.red}
        underline={true}
      >
        {` ❯ ${input} `}
      </Text>
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        <Text
          color={colours.red}
          bold={true}
        >
          {`└─ × error - ${message}`}
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorBlock;
