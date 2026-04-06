import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { Config, ServerStatus } from '../../types.js';

/**
 * The `ServerInfo` component props
 */
interface Props {
  readonly status: ServerStatus;
  readonly config: Config;
}

/**
 * Used to display the server info
 * when the app starts
 *
 * @param props The component props
 * @returns The `SetupInfo` component
 */
const ServerInfo: FunctionComponent<Props> = ({ status, config }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      {
        (status === 'up')
          ? (
              <Text
                color={colours.white}
                backgroundColor={colours.purple}
                underline={true}
              >
                {' ✔ Homebridge Server '}
              </Text>
            )
          : (
              <Text
                color={colours.white}
                backgroundColor={colours.red}
                underline={true}
              >
                {' x Homebridge Server '}
              </Text>
            )
      }
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        {
          (status === 'up') && (
            <Text color={colours.lightGrey}>
              └─ Successfully reached server at
              <Text
                color={colours.purple}
                bold={true}
              >
                {` ${config.hostname}`}
              </Text>
            </Text>
          )
        }
        {
          (status === 'down') && (
            <Text color={colours.lightGrey}>
              └─ Failed to reach server at
              <Text
                color={colours.purple}
                bold={true}
              >
                {` ${config.hostname}, `}
              </Text>
              please check host
            </Text>
          )
        }
      </Box>
    </Box>
  );
};

export default ServerInfo;
