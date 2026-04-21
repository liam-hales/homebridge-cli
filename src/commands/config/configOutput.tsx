import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../hooks/index.js';
import { ConfigData } from '../../api/types.js';
import { CodeBlock, Loader } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/config` command is executed
 *
 * @returns The `ConfigOutput` component
 */
const ConfigOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const [data, setData] = useState<ConfigData | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the config data and set
      // it to state once fetched
      const data = await client.getConfig();
      setData(data);
    })();
  }, [client, setData]);

  return (
    <>
      {
        (data == null) && (
          <Loader>
            Fetching config
          </Loader>
        )
      }
      {
        (data != null) && (
          <Box
            flexDirection="column"
            marginY={1}
          >
            <CodeBlock language="json">
              {JSON.stringify(data, null, 2)}
            </CodeBlock>
          </Box>
        )
      }
    </>
  );
};

export default ConfigOutput;
