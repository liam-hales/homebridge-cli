import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { Loader, Error, VersionInfo } from '../../../components/index.js';
import { colours } from '../../../constants.js';

/**
 * The output component rendered when
 * the `/update/check` command is executed
 *
 * @returns The `UpdateCheckOutput` component
 */
const UpdateCheckOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(async () => {
    // Fetch all data in parallel as each
    // request is not dependent on the other
    return await Promise.all([
      client.getHomebridgeInfo(),
      client.getNodejsInfo(),
      client.getInstalledPlugins(),
    ]);
  });

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Checking for updates...
          </Loader>
        )
      }
      {
        (error != null) && (
          <Error error={error} />
        )
      }
      {
        (data != null) && (() => {
          const [homebridgeInfo, nodejsInfo, plugins] = data;
          return (
            <Box
              flexDirection="column"
              rowGap={2}
              marginY={1}
            >
              <Box
                flexDirection="column"
                rowGap={1}
              >
                <Text
                  color={colours.white}
                  bold={true}
                  underline={true}
                >
                  System
                </Text>
                <Box
                  flexDirection="column"
                  rowGap={1}
                  marginLeft={1}
                >
                  <VersionInfo
                    title="Homebridge"
                    current={homebridgeInfo.current}
                    latest={homebridgeInfo.latest}
                  />
                  <VersionInfo
                    title="Node.js"
                    current={nodejsInfo.current}
                    latest={nodejsInfo.latest}
                  />
                </Box>
              </Box>
              <Box
                flexDirection="column"
                rowGap={1}
              >
                <Text
                  color={colours.white}
                  bold={true}
                  underline={true}
                >
                  Plugins
                </Text>
                <Box
                  flexDirection="column"
                  rowGap={1}
                  marginLeft={1}
                >
                  {
                    plugins.map((plugin) => {
                      const { name, current, latest } = plugin;
                      return (
                        <VersionInfo
                          key={`plugin-update-info-${name}`}
                          title={name}
                          current={current}
                          latest={latest}
                        />
                      );
                    })
                  }
                </Box>
              </Box>
            </Box>
          );
        })()
      }
    </>
  );
};

export default UpdateCheckOutput;
