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
  const { setMode, restartServer } = useApp();

  const [answer, setAnswer] = useState<'yes' | 'no' | undefined>();

  /**
   * Used to detect when the user has answered
   * the yes/no confirmation prompt
   */
  useEffect(() => {
    if (answer === 'yes') {
      void restartServer();
    }

    if (answer === 'no') {
      setMode('idle');
    }
  }, [answer, restartServer, setMode]);

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
