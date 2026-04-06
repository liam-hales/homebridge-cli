import { FunctionComponent, ReactElement } from 'react';
import { Box, useInput } from 'ink';
import { useApp } from '../hooks/index.js';
import {
  Header,
  SetupInfo,
  ServerInfo,
  ApiInfo,
  LoginInfo,
  CommandInput,
  BlockSwitch,
  Keybindings,
} from './index.js';

/**
 * The root app component used as the
 * main entry point for the app
 *
 * @returns The `App` component
 */
const App: FunctionComponent = (): ReactElement => {
  const {
    mode,
    blocks,
    inputValue,
    serverStatus,
    apiStatus,
    loginStatus,
    config,
    credentials,
    setInputValue,
    executeInput,
  } = useApp();

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    if (key.return === true) {
      const trimmed = inputValue.trim();

      // Execute the command only if there
      // is an input to execute
      if (trimmed !== '') {
        executeInput(trimmed);
      }
    }
  });

  return (
    <Box
      flexDirection="column"
      rowGap={2}
      marginY={1}
    >
      <Header />
      <Box
        flexDirection="column"
        marginX={1}
        rowGap={1}
      >
        <SetupInfo config={config} />
        {
          (config != null) && (
            <>
              {
                (serverStatus != null) && (
                  <ServerInfo
                    status={serverStatus}
                    config={config}
                  />
                )
              }
              {
                (apiStatus != null) && (
                  <ApiInfo
                    status={apiStatus}
                    config={config}
                  />
                )
              }
            </>
          )
        }
        <LoginInfo
          status={loginStatus}
          credentials={credentials}
        />
      </Box>
      {
        (blocks.length > 0) && (
          <Box
            flexDirection="column"
            rowGap={2}
            marginX={1}
          >
            {
              blocks.map((block) => {
                const { id, type } = block;

                return (
                  <BlockSwitch
                    key={`${type}-block-${id}`}
                    {...block}
                  />
                );
              })
            }
            {
              (mode === 'running') && (
                <Keybindings bindings={[
                  {
                    key: 'esc',
                    action: 'to cancel',
                  },
                ]}
                />
              )
            }
          </Box>
        )
      }
      {
        (mode === 'idle') && (
          <CommandInput
            value={inputValue}
            onChange={setInputValue}
          />
        )
      }
    </Box>
  );
};

export default App;
