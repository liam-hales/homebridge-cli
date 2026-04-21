import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { useApiClient } from '../../../hooks/index.js';
import { CpuUsage, MemoryUsage } from '../../../api/types.js';
import { TextList, Loader, Meter, MeterList } from '../../../components/index.js';
import { colours } from '../../../constants.js';

/**
 * The output component rendered when
 * the `/server/usage` command is executed
 *
 * @returns The `ServerUsageOutput` component
 */
const ServerUsageOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();

  const [cpuUsage, setCpuUsage] = useState<CpuUsage | undefined>();
  const [memoryUsage, setMemoryUsage] = useState<MemoryUsage | undefined>();

  /**
   * Used to fetch the data when
   * the component mounts
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      // Fetch the CPU and memory usage data
      // and set it to state once fetched
      setCpuUsage(await client.getCpuUsage());
      setMemoryUsage(await client.getMemoryUsage());
    })();
  }, [client, setCpuUsage, setMemoryUsage]);

  return (
    <>
      {
        (cpuUsage == null || memoryUsage == null) && (
          <Loader>
            Fetching server usage
          </Loader>
        )
      }
      {
        (cpuUsage != null && memoryUsage != null) && (
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
        )
      }
    </>
  );
};

export default ServerUsageOutput;
