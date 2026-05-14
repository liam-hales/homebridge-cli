/* eslint-disable @typescript-eslint/naming-convention */

import { FunctionComponent, ReactElement } from 'react';
import { Box, Text } from 'ink';
import { colours } from '../../../constants.js';
import { useApiClient, useSocket } from '../../../hooks/index.js';
import { Loader, Error } from '../../../components/index.js';
import anser from 'anser';

/**
 * The map between ANSI colours
 * and the app colours
 */
const colourMap: Record<string, string> = {
  'ansi-white': colours.lightGrey,
  'ansi-cyan': colours.purple,
  'ansi-yellow': colours.yellow,
  'ansi-green': colours.green,
  'ansi-red': colours.red,
  'ansi-bright-red': colours.red,
  'ansi-black': colours.darkGrey,
};

/**
 * The output component rendered when
 * the `/server/logs` command is executed
 *
 * @returns The `ServerLogsOutput` component
 */
const ServerLogsOutput: FunctionComponent = (): ReactElement => {
  const { socket } = useApiClient();
  const { isConnecting, messages, error } = useSocket(() => socket.tailLog());

  // Convert the messages into
  // log lines to render
  const lines = messages
    .join('')
    .replaceAll('\r', '')
    .split('\n');

  return (
    <>
      {
        (isConnecting === true) && (
          <Loader>
            Connecting...
          </Loader>
        )
      }
      {
        (error != null) && (
          <Error error={error} />
        )
      }
      {
        (messages.length > 0) && (
          <Box flexDirection="column">
            {
              lines.map((line, lineIndex) => {
                // Parse the ANSI text into segments
                // used to apply colours correctly
                const segments = anser.ansiToJson(line, {
                  use_classes: true,
                  remove_empty: true,
                });

                return (
                  <Text
                    key={`log-line-${lineIndex}`}
                  >
                    {
                      segments.map((segment, segmentIndex) => {
                        const { fg, bg, content } = segment;
                        return (
                          <Text
                            key={`log-line-${lineIndex}-segment-${segmentIndex}`}
                            color={colourMap[fg] ?? colours.lightGrey}
                            backgroundColor={colourMap[bg]}
                          >
                            {content}
                          </Text>
                        );
                      })
                    }
                  </Text>
                );
              })
            }
          </Box>
        )
      }
    </>
  );
};

export default ServerLogsOutput;
