import { FunctionComponent, ReactElement, useEffect } from 'react';
import { Text } from 'ink';
import { colours } from '../../constants.js';
import { useApp } from '../../hooks/index.js';

/**
 * The component rendered when
 * the `/logout` command is executed
 *
 * @returns The `Logout` component
 */
const Logout: FunctionComponent = (): ReactElement => {
  const { credentials, setMode, removeCredentials } = useApp();

  /**
   * Used to call the `logout` function
   * when the component loads
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void onLoad(), []);

  /**
   * Used to perform the necessary
   * tasks to logout
   */
  const onLoad = async (): Promise<void> => {
    await removeCredentials();
    setMode('idle');
  };

  return (
    <>
      {
        (credentials != null)
          ? (
              <Text color={colours.lightGrey}>
                └─ Logging out...
              </Text>
            )
          : (
              <Text color={colours.lightGrey}>
                └─ Logout successful
              </Text>
            )
      }
    </>
  );
};

export default Logout;
