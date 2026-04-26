import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { ServerBackup } from '../../../api/types.js';
import { Loader, Error, Table, TextList } from '../../../components/index.js';

/**
 * The output component rendered when
 * the `/server/backups` command is executed
 *
 * @returns The `ServerBackupsOutput` component
 */
const ServerBackupsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(async () => {
    // Fetch all data in parallel as each
    // request is not dependent on the other
    return await Promise.all([
      client.getServerBackups(),
      client.getNextServerBackup(),
    ]);
  });

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching server backups
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
          const [backups, nextBackup] = data;
          return (
            <Box
              flexDirection="column"
              rowGap={1}
              marginBottom={1}
            >
              <Table<ServerBackup> items={backups} />
              <TextList
                title="Backup Info"
                keyWidth={22}
                data={{
                  nextScheduled: nextBackup,
                  interval: nextBackup
                    .local()
                    .format('[daily at] HH:mm'),
                  keptFor: '7 days',
                }}
              />
            </Box>
          );
        })()
      }
    </>
  );
};

export default ServerBackupsOutput;
