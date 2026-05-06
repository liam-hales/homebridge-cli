import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../hooks/index.js';
import { Accessory } from '../../api/types.js';
import { Loader, Error, Table } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/accessories` command is executed
 *
 * @returns The `AccessoriesOutput` component
 */
const AccessoriesOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getAccessories());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching accessories
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
            <Table<Accessory>
              items={data}
              pageSize={20}
              isSelectable={true}
              format={{
                id: (value) => `${value.slice(0, 10)}...`,
              }}
            />
          </Box>
        )
      }
    </>
  );
};

export default AccessoriesOutput;
