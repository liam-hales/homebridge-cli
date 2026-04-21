import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box } from 'ink';
import { useApiClient } from '../../hooks/index.js';
import { Pairing } from '../../api/types.js';
import { Loader, Table } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/pairings` command is executed
 *
 * @returns The `PairingsOutput` component
 */
const PairingsOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const [data, setData] = useState<Pairing[] | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the pairings data and set
      // it to state once fetched
      const data = await client.getPairings();
      setData(data);
    })();
  }, [client, setData]);

  return (
    <>
      {
        (data == null) && (
          <Loader>
            Fetching pairings
          </Loader>
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
