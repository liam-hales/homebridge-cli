import { FunctionComponent, ReactElement } from 'react';
import { colours } from '../../constants.js';
import { Box, Text } from 'ink';

/**
 * The `Error` component props
 */
interface Props {
  readonly error: Error;
}

/**
 * Used to render a given error displaying
 * its message and full stack trace
 *
 * @param props The component props
 * @returns The `Error` component
 */
const Error: FunctionComponent<Props> = ({ error }): ReactElement<Props> => {
  const { message, stack } = error;

  return (
    <Box
      flexDirection="column"
      rowGap={1}
      marginLeft={1}
    >
      <Text
        color={colours.white}
        backgroundColor={colours.red}
        bold={true}
        underline={true}
      >
        {` └─ × [error] — An error occurred `}
      </Text>
      <Box
        flexDirection="column"
        marginLeft={2}
      >
        <Text
          color={colours.red}
          bold={true}
        >
          {`└─ [message] — ${message}`}
        </Text>
        {
          (stack != null) && (
            <Text color={colours.grey}>
              {`└─ [stack] — ${stack}`}
            </Text>
          )
        }
      </Box>
    </Box>
  );
};

export default Error;
