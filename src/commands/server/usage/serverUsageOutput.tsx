import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { TextList, Loader, Error, Meter, MeterList } from '../../../components/index.js';
import { colours } from '../../../constants.js';

/**
 * The output component rendered when
 * the `/server/usage` command is executed
 *
 * @returns The `ServerUsageOutput` component
 */
const ServerUsageOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(async () => {
    // Fetch all data in parallel as each
    // request is not dependent on the other
    return await Promise.all([
      client.getCpuUsage(),
      client.getMemoryUsage(),
    ]);
  });

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching server usage
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
          const [cpuUsage, memoryUsage] = data;
          return (
            <Box
              flexDirection="column"
              rowGap={2}
              marginY={1}
            >
              <Box
                flexDirection="column"
                rowGap={1}
              >
                <Text
                  color={colours.white}
                  bold={true}
                  underline={true}
                >
                  CPU Usage
                </Text>
                <Box
                  width={56}
                  flexDirection="row"
                  columnGap={1}
                  marginLeft={1}
                >
                  <Text color={colours.lightGrey}>
                    load
                  </Text>
                  <Meter
                    value={cpuUsage.currentLoad}
                    min={0}
                    max={100}
                  />
                  <Text color={colours.purple}>
                    {`${cpuUsage.currentLoad}%`}
                  </Text>
                </Box>
                <TextList
                  data={{
                    currentTemp: cpuUsage.currentTemp,
                    maxTemp: cpuUsage.maxTemp,
                  }}
                  keyWidth={18}
                  transform={{
                    currentTemp: (value) => `${value} °C`,
                    maxTemp: (value) => `${value} °C`,
                  }}
                />
              </Box>
              <Box
                flexDirection="column"
                rowGap={1}
              >
                <TextList
                  data={{
                    total: memoryUsage.total,
                  }}
                  title="Memory Usage"
                  keyWidth={12}
                  transform={{
                    total: (value) => `${value} GB`,
                  }}
                />
                <Box
                  width={60}
                  flexDirection="column"
                >
                  <MeterList
                    data={{
                      available: memoryUsage.available,
                      free: memoryUsage.free,
                      used: memoryUsage.used,
                      active: memoryUsage.active,
                    }}
                    min={0}
                    max={memoryUsage.total}
                    unit="GB"
                  />
                </Box>
              </Box>
            </Box>
          );
        })()
      }
    </>
  );
};

export default ServerUsageOutput;
