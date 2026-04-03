import { FunctionComponent, ReactElement, useState } from 'react';
import { Text, Box } from 'ink';
import { colours } from '../constants.js';
import { Header, CommandInput } from './index.js';

/**
 * The root app component used as the
 * main entry point for the app
 *
 * @returns The `App` component
 */
const App: FunctionComponent = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Box
        flexDirection="column"
        alignItems="flex-start"
        rowGap={1}
      >
        <Header />
      </Box>
      <Box
        flexDirection="column"
        alignItems="flex-start"
        rowGap={1}
        paddingX={1}
        paddingY={2}
      >
        <Text color={colours.lightGrey}>
          Run
          <Text
            color={colours.purple}
            bold={true}
          >
            {' /init '}
          </Text>
          to connect to a Homebridge server
        </Text>
        <Text color={colours.lightGrey}>
          Run
          <Text
            color={colours.purple}
            bold={true}
          >
            {' /login '}
          </Text>
          to login to Homebridge
        </Text>
      </Box>
      <CommandInput
        value={inputValue}
        onChange={setInputValue}
      />
    </>
  );
};

export default App;
