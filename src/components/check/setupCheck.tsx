import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import { Config } from '../../types.js';

/**
 * The `SetupInfo` component props
 */
interface Props {
  readonly config?: Config;
}

/**
 * Used to display the setup check
 * status when the app starts
 *
 * @param props The component props
 * @returns The `SetupInfo` component
 */
const SetupCheck: FunctionComponent<Props> = ({ config }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      {
        (config != null)
          ? (
              <Text
                color={colours.white}
                backgroundColor={colours.purple}
                underline={true}
              >
                {` ✔ Setup `}
              </Text>
            )
          : (
              <Text
                color={colours.white}
                backgroundColor={colours.orange}
                underline={true}
              >
                {` → Setup required `}
              </Text>
            )
      }
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        {
          (config != null)
            ? (
                <Text color={colours.lightGrey}>
                  └─ Config loaded from
                  <Text
                    color={colours.purple}
                    bold={true}
                  >
                    {` ${config.filePath}`}
                  </Text>
                </Text>
              )
            : (
                <>
                  <Text color={colours.lightGrey}>
                    └─ No config found
                  </Text>
                  <Text color={colours.lightGrey}>
                    └─ Run
                    <Text
                      color={colours.orange}
                      bold={true}
                    >
                      {' /init '}
                    </Text>
                    to connect to a Homebridge server
                  </Text>
                </>
              )
        }
      </Box>
    </Box>
  );
};

export default SetupCheck;
