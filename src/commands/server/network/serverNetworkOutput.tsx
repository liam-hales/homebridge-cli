import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { ServerNetworkEntry } from '../../../api/types.js';
import { Loader, Error, Table, TextList } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/server/network` command is executed
 *
 * @returns The `ServerNetworkOutput` component
 */
const ServerNetworkOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(async () => {
    // Fetch all data in parallel as each
    // request is not dependent on the other
    return await Promise.all([
      client.getServerNetworkOverview(),
      client.getServerInfo(),
    ]);
  });

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching server network
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
          const [networkOverview, serverInfo] = data;
          return (
            <Box
              flexDirection="column"
              rowGap={1}
              marginBottom={1}
            >
              <Table<ServerNetworkEntry> items={networkOverview.entries} />
              <TextList
                data={serverInfo.network}
                title="Connection Info"
                keyWidth={26}
              />
            </Box>
          );
        })()
      }
    </>
  );
};

export default ServerNetworkOutput;
