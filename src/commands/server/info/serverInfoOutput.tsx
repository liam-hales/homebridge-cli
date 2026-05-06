import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { TextList, Loader, Error } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/server/info` command is executed
 *
 * @returns The `ServerInfoOutput` component
 */
const ServerInfoOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(async () => {
    // Fetch all data in parallel as each
    // request is not dependent on the other
    return await Promise.all([
      client.getServerInfo(),
      client.getHomebridgeInfo(),
      client.getNodejsInfo(),
    ]);
  });

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching server info
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
          const [serverInfo, homebridgeInfo, nodejsInfo] = data;
          return (
            <Box
              flexDirection="column"
              rowGap={1}
              marginY={1}
            >
              <TextList
                data={serverInfo.system}
                title="System"
                keyWidth={26}
              />
              <TextList
                data={serverInfo.os}
                title="Operating System"
                keyWidth={26}
              />
              <TextList
                data={homebridgeInfo}
                title="Homebridge"
                keyWidth={26}
              />
              <TextList
                data={nodejsInfo}
                title="Node.js"
                keyWidth={26}
              />
            </Box>
          );
        })()
      }
    </>
  );
};

export default ServerInfoOutput;
