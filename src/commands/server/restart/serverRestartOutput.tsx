import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useApp } from '../../../hooks/index.js';
import { Box, Text } from 'ink';
import { colours } from '../../../constants.js';
import { ConfirmPrompt } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/server/restart` command is executed
 *
 * @returns The `ServerRestartOutput` component
 */
const ServerRestartOutput: FunctionComponent = (): ReactElement => {
  const { exit, restartServer } = useApp();

  const [answer, setAnswer] = useState<'yes' | 'no' | undefined>();

  /**
   * Used to handle when the
   * answer state changes
   */
  const _onAnswerChange = async (): Promise<void> => {
    if (answer === 'yes') {
      await restartServer();
      exit('Restart command sent — check server status above');
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
              title="Are you sure you want to restart the server?"
              onConfirm={setAnswer}
            />
          </Box>
        )
      }
      {
        (answer === 'yes') && (
          <Text color={colours.lightGrey}>
            └─ Sending restart command...
          </Text>
        )
      }
    </Box>
  );
};

export default ServerRestartOutput;
