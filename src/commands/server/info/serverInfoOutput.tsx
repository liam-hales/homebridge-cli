import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { NodejsInfo, ServerInfo } from '../../../api/types.js';
import { List, Loader } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/server/info` command is executed
 *
 * @returns The `ServerInfoOutput` component
 */
const ServerInfoOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();

  const [serverInfo, setServerInfo] = useState<ServerInfo | undefined>();
  const [nodejsInfo, setNodejsInfo] = useState<NodejsInfo | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the server and Node.js info data
      // and set it to state once fetched
      setServerInfo(await client.getServerInfo());
      setNodejsInfo(await client.getNodejsInfo());
    })();
  }, [client, setServerInfo, setNodejsInfo]);

  return (
    <>
      {
        (serverInfo == null || nodejsInfo == null) && (
          <Loader>
            Fetching server info
          </Loader>
        )
      }
      {
        (serverInfo != null && nodejsInfo != null) && (
          <Box
            flexDirection="column"
            rowGap={1}
            marginY={1}
          >
            <List
              title="System"
              data={serverInfo.system}
            />
            <List
              title="Operating System"
              data={serverInfo.os}
            />
            <List
              title="Network"
              data={serverInfo.network}
            />
            <List
              title="Node.js"
              data={nodejsInfo}
            />
          </Box>
        )
      }
    </>
  );
};

export default ServerInfoOutput;
