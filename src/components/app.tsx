import { FunctionComponent, ReactElement } from 'react';
import { Box, useInput } from 'ink';
import { useApp } from '../hooks/index.js';
import { colours } from '../constants.js';
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
 * The top level app component responsible for rendering the overall
 * application, its layout and any downstream child components
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
          (config != null && serverStatus != null) && (
            <ServerInfo
              status={serverStatus}
              config={config}
            />
          )
        }
        {
          (apiStatus != null) && (
            <ApiInfo status={apiStatus} />
          )
        }
        {
          (apiStatus === 'up') && (
            <LoginInfo
              status={loginStatus}
              credentials={credentials}
            />
          )
        }
      </Box>
      {
        (blocks.length > 0) && (
          <>
            <Box
              width="100%"
              borderStyle="classic"
              borderColor={colours.darkGrey}
              borderBottom={false}
              borderLeft={false}
              borderRight={false}
            />
            <Box
              flexDirection="column"
              rowGap={3}
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
          </>
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
