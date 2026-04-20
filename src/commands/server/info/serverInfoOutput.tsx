import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { NodejsInfo, ServerInfo } from '../../../api/types.js';
import { TextList, Loader } from '../../../components/index.js';

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
            <TextList
              data={serverInfo.system}
              title="System"
              spacing={6}
            />
            <TextList
              data={serverInfo.os}
              title="Operating System"
              spacing={6}
            />
            <TextList
              data={serverInfo.network}
              title="Network"
              spacing={6}
            />
            <TextList
              data={nodejsInfo}
              title="Node.js"
              spacing={6}
            />
          </Box>
        )
      }
    </>
  );
};

export default ServerInfoOutput;
