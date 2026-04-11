import { FunctionComponent, ReactElement, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { useApp } from '../../hooks/index.js';
import { colours } from '../../constants.js';
import TextInput from 'ink-text-input';

/**
 * The component rendered when
 * the `/init` command is executed
 *
 * @returns The `Init` component
 */
const Init: FunctionComponent = (): ReactElement => {
  const { setConfig } = useApp();

  const [stage, setStage] = useState<'set-host' | 'set-port'>('set-host');
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');

  /**
   * Used to handle when the
   * enter/return key is pressed
   */
  const onEnter = async (): Promise<void> => {
    if (stage === 'set-host' && host !== '') {
      setStage('set-port');
    }

    if (stage === 'set-port' && port !== '') {
      setConfig(host, Number.parseInt(port));
    }
  };

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    if (key.return === true) {
      void onEnter();
    }
  });

  return (
    <Box
      flexDirection="column"
      rowGap={1}
      marginLeft={1}
    >
      <Box
        flexDirection="column"
        marginLeft={1}
      >
        <Text color={colours.lightGrey}>
          └─ Enter Homebridge server details
        </Text>
      </Box>
      <Box
        flexDirection="row"
        columnGap={1}
      >
        <Text
          color={colours.white}
          backgroundColor={colours.purple}
          underline={true}
        >
          {` Host: `}
        </Text>
        <TextInput
          value={host}
          onChange={setHost}
          focus={stage === 'set-host'}
        />
      </Box>
      {
        (stage === 'set-port') && (
          <Box
            flexDirection="row"
            columnGap={1}
          >
            <Text
              color={colours.white}
              backgroundColor={colours.purple}
              underline={true}
            >
              {` Port: `}
            </Text>
            <TextInput
              value={port}
              onChange={setPort}
            />
          </Box>
        )
      }
    </Box>
  );
};

export default Init;
