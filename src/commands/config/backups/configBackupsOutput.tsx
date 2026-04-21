import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { ConfigBackup } from '../../../api/types.js';
import { Loader, Table } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/config/backups` command is executed
 *
 * @returns The `ConfigBackupsOutput` component
 */
const ConfigBackupsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const [data, setData] = useState<ConfigBackup[] | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the config backups data and set
      // it to state once fetched
      const data = await client.getConfigBackups();
      setData(data);
    })();
  }, [client, setData]);

  return (
    <>
      {
        (data == null) && (
          <Loader>
            Fetching config backups
          </Loader>
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
