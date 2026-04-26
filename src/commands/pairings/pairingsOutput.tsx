import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../hooks/index.js';
import { Pairing } from '../../api/types.js';
import { Loader, Error, Table } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/pairings` command is executed
 *
 * @returns The `PairingsOutput` component
 */
const PairingsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getPairings());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching pairings
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
            <Table<Pairing> items={data} />
          </Box>
        )
      }
    </>
  );
};

export default PairingsOutput;
