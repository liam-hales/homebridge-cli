import { FunctionComponent, ReactElement, useEffect } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { useApp } from '../../hooks/index.js';

/**
 * The component rendered when
 * the `/logout` command is executed
 *
 * @returns The `Logout` component
 */
const Logout: FunctionComponent = (): ReactElement => {
  const { removeCredentials } = useApp();

  /**
   * Used to call the `removeCredentials`
   * function when the component loads
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void removeCredentials(), []);

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

export default Logout;
