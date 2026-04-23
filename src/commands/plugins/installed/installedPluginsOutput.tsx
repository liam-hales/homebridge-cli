import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useApiClient } from '../../../hooks/index.js';
import { InstalledPlugin } from '../../../api/types.js';
import { Loader, Table } from '../../../components/index.js';
import { Box } from 'ink';

/**
 * The output component rendered when
 * the `/plugins/installed` command is executed
 *
 * @returns The `InstalledPluginsOutput` component
 */
const InstalledPluginsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const [data, setData] = useState<InstalledPlugin[] | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the installed plugins data and set
      // it to state once fetched
      const data = await client.getInstalledPlugins();
      setData(data);
    })();
  }, [client, setData]);

  return (
    <>
      {
        (data == null) && (
          <Loader>
            Fetching installed plugins
          </Loader>
        )
      }
      {
        (data != null) && (
          <Box
            flexDirection="column"
            marginBottom={1}
          >
            <Table<InstalledPlugin> items={data} />
          </Box>
        )
      }
    </>
  );
};

export default InstalledPluginsOutput;
