import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { ConfigBackup } from '../../../api/types.js';
import { Loader, Error, Table } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/config/backups` command is executed
 *
 * @returns The `ConfigBackupsOutput` component
 */
const ConfigBackupsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getConfigBackups());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching config backups
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
            <Table<ConfigBackup> items={data} />
          </Box>
        )
      }
    </>
  );
};

export default ConfigBackupsOutput;
