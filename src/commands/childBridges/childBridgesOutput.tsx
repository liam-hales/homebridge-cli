import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../hooks/index.js';
import { ChildBridge } from '../../api/types.js';
import { Loader, Error, Table } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/child-bridges` command is executed
 *
 * @returns The `ChildBridgesOutput` component
 */
const ChildBridgesOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getChildBridges());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching child bridges
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
            <Table<ChildBridge> items={data} />
          </Box>
        )
      }
    </>
  );
};

export default ChildBridgesOutput;
