import { FunctionComponent, ReactElement, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { useApp } from '../../hooks/index.js';
import { colours } from '../../constants.js';
import TextInput from 'ink-text-input';

/**
 * The output component rendered when
 * the `/init` command is executed
 *
 * @returns The `InitOutput` component
 */
const InitOutput: FunctionComponent = (): ReactElement => {
  const { setConfig, exit } = useApp();

  const [stage, setStage] = useState<'set-host' | 'set-port'>('set-host');
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');

  /**
   * Used to handle when the
   * enter/return key is pressed
   */
  const _onEnter = async (): Promise<void> => {
    if (stage === 'set-host' && host !== '') {
      setStage('set-port');
    }

    if (stage === 'set-port' && port !== '') {
      setConfig(host, Number.parseInt(port));
      exit('Setup complete — config set');
    }
  };

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    if (key.return === true) {
      void _onEnter();
    }
  });

  return (
    <Box
      flexDirection="column"
      rowGap={1}
      marginLeft={1}
    >
      <Text color={colours.lightGrey}>
        └─ Enter Homebridge server details
      </Text>
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

export default InitOutput;
