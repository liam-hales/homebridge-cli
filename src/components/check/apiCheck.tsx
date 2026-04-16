import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { ApiStatus } from '../../types.js';

/**
 * The `ApiCheck` component props
 */
interface Props {
  readonly status: ApiStatus;
}

/**
 * Used to display the API check
 * status when the app starts
 *
 * @param props The component props
 * @returns The `ApiCheck` component
 */
const ApiCheck: FunctionComponent<Props> = ({ status }): ReactElement<Props> => {
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
                {' × Homebridge API '}
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
            <>
              <Text color={colours.lightGrey}>
                └─ API unavailable, this CLI is powered by the same API used by Homebridge UI and is therefore required in order to function
              </Text>
              <Text color={colours.lightGrey}>
                └─ For more info, see the docs —
                <Text
                  color={colours.red}
                  bold={true}
                >
                  {` https://github.com/liam-hales/homebridge-cli#api-unavailable- `}
                </Text>
              </Text>
            </>
          )
        }
      </Box>
    </Box>
  );
};

export default ApiCheck;
