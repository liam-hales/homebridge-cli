import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../constants.js';
import semver from 'semver';

/**
 * The `VersionInfo` component props
 */
interface Props {
  readonly title: string;
  readonly current: string;
  readonly latest: string;
}

/**
 * Used to render the version info for a given package or service etc. Shows the
 * user if they have the latest version installed or if an update is available
 *
 * @param props The component props
 * @returns The `VersionInfo` component
 */
const VersionInfo: FunctionComponent<Props> = ({ title, current, latest }): ReactElement<Props> => {
  return (
    <Box flexDirection="column">
      <Text
        color={colours.lightGrey}
        bold={true}
      >
        {title}
      </Text>
      <Box
        flexDirection="row"
        marginLeft={1}
      >
        <Box
          width={28}
          flexDirection="column"
        >
          {
            (semver.gt(latest, current) === true)
              ? (
                  <Text color={colours.lightGrey}>
                    ⚠ Update available
                  </Text>
                )
              : (
                  <Text color={colours.lightGrey}>
                    ✔ Up to date
                  </Text>
                )
          }
        </Box>
        {
          (semver.gt(latest, current) === true)
            ? (
                <Box
                  flexDirection="row"
                  columnGap={1}
                >
                  <Text
                    color={colours.white}
                    backgroundColor={colours.orange}
                    bold={true}
                    underline={true}
                  >
                    {` ${current} `}
                  </Text>
                  <Text color={colours.lightGrey}>
                    ⟶
                  </Text>
                  <Text
                    color={colours.white}
                    backgroundColor={colours.orange}
                    bold={true}
                    underline={true}
                  >
                    {` ${latest} `}
                  </Text>
                </Box>
              )
            : (
                <Text
                  color={colours.white}
                  backgroundColor={colours.green}
                  bold={true}
                  underline={true}
                >
                  {` ${current} `}
                </Text>
              )
        }
      </Box>
    </Box>
  );
};

export default VersionInfo;
