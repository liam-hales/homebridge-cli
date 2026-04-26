import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { InstalledPlugin } from '../../../api/types.js';
import { Loader, Error, Table } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/plugins/installed` command is executed
 *
 * @returns The `InstalledPluginsOutput` component
 */
const InstalledPluginsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getInstalledPlugins());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching installed plugins
          </Loader>
        )
      }
      {
        (error != null) && (
          <Error error={error} />
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
