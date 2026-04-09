import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { Credentials, LoginStatus } from '../../types.js';
import os from 'node:os';

/**
 * The `LoginInfo` component props
 */
interface Props {
  readonly status?: LoginStatus;
  readonly credentials?: Credentials;
}

/**
 * Used to display the login info
 * when the app starts
 *
 * @param props The component props
 * @returns The `LoginInfo` component
 */
const LoginInfo: FunctionComponent<Props> = ({ status, credentials }): ReactElement<Props> => {
  /**
   * Used to get the credentials store
   * name based on the OS platform
   */
  const getStoreName = (): string => {
    const platform = os.platform();

    switch (platform) {
      case 'darwin':
        return 'macOS Keychain';

      case 'win32':
        return 'Windows Credential Vault';

      case 'linux':
        return 'libsecret';

      default:
        throw new Error(`Unknown OS platform ${platform}`);
    }
  };

  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      {
        (status === 'authenticated' && credentials != null)
          ? (
              <Text
                color={colours.white}
                backgroundColor={colours.purple}
                underline={true}
              >
                {' ✔ Login '}
              </Text>
            )
          : (
              <Text
                color={colours.white}
                backgroundColor={colours.red}
                underline={true}
              >
                {' x Login '}
              </Text>
            )
      }
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        {
          (credentials == null) && (
            <>
              <Text color={colours.lightGrey}>
                └─ No credentials found
              </Text>
              <Text color={colours.lightGrey}>
                └─ Run
                <Text
                  color={colours.purple}
                  bold={true}
                >
                  {' /login '}
                </Text>
                to login to Homebridge
              </Text>
            </>
          )
        }
        {
          (credentials != null) && (
            <>
              <Text color={colours.lightGrey}>
                └─ Credentials loaded from
                <Text
                  color={colours.purple}
                  bold={true}
                >
                  {` ${getStoreName()} `}
                </Text>
              </Text>
              {
                (status === 'authenticated') && (
                  <Text color={colours.lightGrey}>
                    └─ Successfully logged in with user
                    <Text
                      color={colours.purple}
                      bold={true}
                    >
                      {` ${credentials.username}`}
                    </Text>
                  </Text>
                )
              }
              {
                (status === 'failed') && (
                  <Text color={colours.lightGrey}>
                    └─ Failed to log in with user
                    <Text
                      color={colours.purple}
                      bold={true}
                    >
                      {` ${credentials.username}`}
                    </Text>
                    , please check credentials
                  </Text>
                )
              }
            </>
          )
        }
      </Box>
    </Box>
  );
};

export default LoginInfo;
