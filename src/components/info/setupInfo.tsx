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
 * Used to display the setup info
 * when the app starts
 *
 * @param props The component props
 * @returns The `SetupInfo` component
 */
const SetupInfo: FunctionComponent<Props> = ({ config }): ReactElement<Props> => {
  return (
    <Box
      flexDirection="column"
      rowGap={1}
    >
      <Text
        color={colours.white}
        backgroundColor={colours.purple}
        underline={true}
      >
        {
          (config != null)
            ? ' ✔ Setup '
            : ' Setup required '
        }
      </Text>
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
                      color={colours.purple}
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

export default SetupInfo;
