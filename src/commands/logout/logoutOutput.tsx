import { FunctionComponent, ReactElement, useEffect } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { useApp } from '../../hooks/index.js';

/**
 * The output component rendered when
 * the `/logout` command is executed
 *
 * @returns The `LogoutOutput` component
 */
const LogoutOutput: FunctionComponent = (): ReactElement => {
  const { removeCredentials, exit } = useApp();

  /**
   * Used to handle when the
   * enter/return key is pressed
   */
  const _onMount = async (): Promise<void> => {
    await removeCredentials();
    exit('Logout successful');
  };

  /**
   * Used to call the `_onMount`
   * function when the component mounts
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void _onMount(), []);

  return (
    <Box
      flexDirection="column"
      marginLeft={1}
    >
      <Text color={colours.lightGrey}>
        └─ Logging out...
      </Text>
    </Box>
  );
};

export default LogoutOutput;
