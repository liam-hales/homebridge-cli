import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { useApiClient, useQuery } from '../../../hooks/index.js';
import { Loader, Error, Duration } from '../../../components/index.js';
import date, { type Date } from '../../../date.js';
import { colours } from '../../../constants.js';

/**
 * The output component rendered when
 * the `/server/uptime` command is executed
 *
 * @returns The `ServerUptimeOutput` component
 */
const ServerUptimeOutput: FunctionComponent = (): ReactElement => {
  const client = useApiClient();
  const { isLoading, data, error } = useQuery(() => client.getServerUptime());

  const [now, setNow] = useState<Date>(() => date.utc());

  /**
   * Used to start a one-second interval that updates the
   * `now` state so the displayed uptime values count up
   */
  useEffect(() => {
    if (data == null) {
      return;
    }

    // Create an interval that runs every second
    // to set the new `now` date state
    const interval = setInterval(() => setNow(date.utc()), 1000);

    // Return the clean-up function
    // which clears the interval
    return (): void => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <>
      {
        (isLoading === true) && (
          <Loader>
            Fetching server uptime
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
          const { current, server, process } = data;
          const elapsed = now.diff(current, 'second', true);

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
                  Server Uptime
                </Text>
                <Box
                  flexDirection="row"
                  columnGap={1}
                  marginLeft={1}
                >
                  <Text color={colours.lightGrey}>
                    └─
                  </Text>
                  <Duration seconds={server + elapsed} />
                </Box>
              </Box>
              <Box
                flexDirection="column"
                rowGap={1}
                marginLeft={1}
              >
                <Text
                  color={colours.white}
                  bold={true}
                  underline={true}
                >
                  Process Uptime
                </Text>
                <Box
                  flexDirection="row"
                  columnGap={1}
                >
                  <Text color={colours.lightGrey}>
                    └─
                  </Text>
                  <Duration seconds={process + elapsed} />
                </Box>
              </Box>
            </Box>
          );
        })()
      }
    </>
  );
};

export default ServerUptimeOutput;
