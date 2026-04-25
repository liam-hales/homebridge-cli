import { FunctionComponent, ReactElement, useEffect } from 'react';
import { useApp } from '../../../hooks/index.js';
import { Box, Text } from 'ink';
import { colours } from '../../../constants.js';

/**
 * The output component rendered when
 * the `/server/restart` command is executed
 *
 * @returns The `ServerRestartOutput` component
 */
const ServerRestartOutput: FunctionComponent = (): ReactElement => {
  const { restartServer } = useApp();

  /**
   * Used to call the `restartServer`
   * function when the component mounts
   */
  useEffect(() => void restartServer(), [restartServer]);

  return (
    <Box
      flexDirection="column"
      marginLeft={1}
    >
      <Text color={colours.lightGrey}>
        └─ Sending restart command...
      </Text>
    </Box>
  );
};

export default ServerRestartOutput;
