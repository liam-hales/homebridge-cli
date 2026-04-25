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
  const { removeCredentials } = useApp();

  /**
   * Used to call the `removeCredentials`
   * function when the component mounts
   */
  useEffect(() => void removeCredentials(), [removeCredentials]);

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
