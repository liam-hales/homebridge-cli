import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { ServerBackup } from '../../../api/types.js';
import { Loader, Table, TextList } from '../../../components/index.js';
import date from '../../../date.js';

/**
 * The output component rendered when
 * the `/server/backups` command is executed
 *
 * @returns The `ServerBackupsOutput` component
 */
const ServerBackupsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();

  const [data, setData] = useState<ServerBackup[] | undefined>();
  const [nextBackup, setNextBackup] = useState<Date | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the server backups and next backup date
      // in parallel and set them to state once fetched
      const [backups, next] = await Promise.all([
        client.getServerBackups(),
        client.getNextServerBackup(),
      ]);

      setData(backups);
      setNextBackup(next);
    })();
  }, [client, setData, setNextBackup]);

  return (
    <>
      {
        (data == null || nextBackup == null) && (
          <Loader>
            Fetching server backups
          </Loader>
        )
      }
      {
        (data != null && nextBackup != null) && (
          <Box
            flexDirection="column"
            rowGap={1}
            marginBottom={1}
          >
            <Table<ServerBackup> items={data} />
            <TextList
              title="Backup Info"
              data={{
                nextBackup: date
                  .utc(nextBackup)
                  .format('DD MMM YYYY [at] HH:mm'),
              }}
            />
          </Box>
        )
      }
    </>
  );
};

export default ServerBackupsOutput;
