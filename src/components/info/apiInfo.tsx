import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { ApiStatus, Config } from '../../types.js';

/**
 * The `ApiInfo` component props
 */
interface Props {
  readonly status: ApiStatus;
  readonly config: Config;
}

/**
 * Used to display the API info
 * when the app starts
 *
 * @param props The component props
 * @returns The `ApiInfo` component
 */
const ApiInfo: FunctionComponent<Props> = ({ status, config }): ReactElement<Props> => {
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
                {' ✔ Homebridge API '}
              </Text>
            )
          : (
              <Text
                color={colours.white}
                backgroundColor={colours.red}
                underline={true}
              >
                {' x Homebridge API '}
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
              └─ API available at
              <Text
                color={colours.purple}
                bold={true}
              >
                {' /api'}
              </Text>
            </Text>
          )
        }
        {
          (status === 'down') && (
            <Text color={colours.lightGrey}>
              └─ API unavailable, this CLI uses the same API that sits along side the Homebridge UI and is therefore required in order to function.
            </Text>
          )
        }
      </Box>
    </Box>
  );
};

export default ApiInfo;
