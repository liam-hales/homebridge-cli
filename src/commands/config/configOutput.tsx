import { FunctionComponent, ReactElement } from 'react';
import { Box } from 'ink';
import { useApiClient, useQuery } from '../../hooks/index.js';
import { CodeBlock, Error, Loader } from '../../components/index.js';

/**
 * The output component rendered when
 * the `/config` command is executed
 *
 * @returns The `ConfigOutput` component
 */
const ConfigOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getConfig());

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching config
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
            marginY={1}
          >
            <CodeBlock language="json">
              {JSON.stringify(data, null, 2)}
            </CodeBlock>
          </Box>
        )
      }
    </>
  );
};

export default ConfigOutput;
