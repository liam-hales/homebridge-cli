import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { useApp } from '../../hooks/index.js';
import { ConfirmPrompt } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/logout` command is executed
 *
 * @returns The `LogoutOutput` component
 */
const LogoutOutput: FunctionComponent = (): ReactElement => {
  const { removeCredentials, exit } = useApp();

  const [answer, setAnswer] = useState<'yes' | 'no' | undefined>();

  /**
   * Used to handle when the
   * answer state changes
   */
  const _onAnswerChange = async (): Promise<void> => {
    if (answer === 'yes') {
      await removeCredentials();
      exit('Logout successful');
    }

    if (answer === 'no') {
      exit('Cancelled by user');
    }
  };

  /**
   * Used to call the `_onAnswerChange`
   * function when the `answer` state changes
   */
  useEffect(() => void _onAnswerChange(), [answer]);

  return (
    <Box
      flexDirection="column"
      marginLeft={1}
    >
      {
        (answer == null) && (
          <Box
            flexDirection="row"
            columnGap={1}
          >
            <Text color={colours.lightGrey}>
              └─
            </Text>
            <ConfirmPrompt
              title="Are you sure you want to log out?"
              onConfirm={setAnswer}
            />
          </Box>
        )
      }
      {
        (answer === 'yes') && (
          <Text color={colours.lightGrey}>
            └─ Logging out...
          </Text>
        )
      }
    </Box>
  );
};

export default LogoutOutput;
