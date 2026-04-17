import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useApiClient } from '../../hooks/index.js';
import { User } from '../../api/types.js';
import { Loader, Table } from '../../components/index.js';
import { Box } from 'ink';

/**
 * The output component rendered when
 * the `/users` command is executed
 *
 * @returns The `UsersOutput` component
 */
const UsersOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const [data, setData] = useState<User[] | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      const data = await client.getUsers();
      setData(data);
    })();
  }, [client, setData]);

  return (
    <>
      {
        (data == null) && (
          <Loader>
            Fetching users
          </Loader>
        )
      }
      {
        (data != null) && (
          <Box
            flexDirection="column"
            marginY={1}
          >
            <Table<User> items={data} />
          </Box>
        )
      }
    </>
  );
};

export default UsersOutput;
