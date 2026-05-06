import { FunctionComponent, ReactElement } from 'react';
import { useApiClient, useQuery } from '../../hooks/index.js';
import { User } from '../../api/types.js';
import { Loader, Error, Table } from '../../components/index.js';
import { Box } from 'ink';

/**
 * The output component rendered when
 * the `/users` command is executed
 *
 * @returns The `UsersOutput` component
 */
const UsersOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getUsers());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching users
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
            <Table<User>
              items={data}
              showRowColumn={false}
            />
          </Box>
        )
      }
    </>
  );
};

export default UsersOutput;
