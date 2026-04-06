import { FunctionComponent, ReactElement, ReactNode, useEffect, useState } from 'react';
import { AppContext } from '../context/index.js';
import { ApiStatus, AppMode, Block, Config, LoginStatus, ServerStatus } from '../types.js';
import { commands } from '../commands/index.js';
import { nanoid } from 'nanoid';
import { useApp, useInput } from 'ink';
import path from 'path';
import os from 'os';
import fs from 'fs';

/**
 * The `AppProvider` component props
 */
interface Props {
  readonly children: ReactNode;
}

/**
 * Used to provide the `AppContext` value which
 * consists of the app state and actions
 *
 * @param props The component props
 * @returns The `AppProvider` component
 * @example
 *
 * return (
 *   <AppProvider>
 *     { ... }
 *   </AppProvider>
 * );
 */
const AppProvider: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  const { exit } = useApp();

  const [mode, setMode] = useState<AppMode>('idle');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const [serverStatus, setServerStatus] = useState<ServerStatus | undefined>();
  const [apiStatus, setApiStatus] = useState<ApiStatus | undefined>();
  const [loginStatus, setLoginStatus] = useState<LoginStatus | undefined>();

  const [config, setConfig] = useState<Config | undefined>();

  /**
   * Used to call the `_init` function
   * when the app starts
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void _init(), []);

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // If the user pressed the escape key then
    // set the app mode back to `idle`
    if (key.escape === true) {
      setMode('idle');
    }
  });

  /**
   * Used to fetch the app config
   * and initialise the state
   */
  const _init = async (): Promise<void> => {
    const config = _getConfig();

    setConfig(config);
  };

  /**
   * Used to get the app `config.json` file
   * from the `.homebridge-cli` directory
   */
  const _getConfig = (): Config | undefined => {
    // Define the relative and full file path to the
    // config using the users home directory
    const relativePath = '.homebridge-cli/config.json';
    const fullPath = path.join(os.homedir(), '.homebridge-cli/config.json');

    try {
      // Read and parse the
      // config file data
      const fileData = fs.readFileSync(fullPath, 'utf-8');
      return {
        ...JSON.parse(fileData) as Config,
        filePath: `~/${relativePath}`,
        apiPath: '/api',
      };
    }
    catch {
      // The config may not exist so if the
      // file cannot be open then return
      return;
    }
  };

  /**
   * Used to validate and
   * execute a given input
   *
   * @param input The input
   */
  const _executeInput = (input: string): void => {
    const blockId = nanoid(16);

    // Check if the user
    // wants to exit
    if (input === 'exit') {
      exit();
    }

    try {
      // Attempt to find a command that matches
      // the users input via its run value
      const command = commands.find((command) => command.run === input);

      // If no command could be found
      // then throw an error
      if (command == null) {
        throw new Error(`Command "${input}" not found`);
      }

      setMode('running');
      setBlocks((previous) => [
        ...previous,
        {
          type: 'command',
          id: blockId,
          input: input,
          commandId: command.id,
        },
      ]);
    }
    catch (error) {
      if (error instanceof Error) {
        const { message } = error;

        setBlocks((previous) => {
          return [
            ...previous,
            {
              type: 'error',
              id: blockId,
              input: input,
              message: message,
            },
          ];
        });

        return;
      }

      // Re-throw the error if
      // it cannot be handled
      throw error;
    }
    finally {
      // Reset the input value once the
      // block as been added to state
      setInputValue('');
    }
  };

  return (
    <AppContext.Provider value={
      {
        mode: mode,
        blocks: blocks,
        inputValue: inputValue,
        serverStatus: serverStatus,
        apiStatus: apiStatus,
        loginStatus: loginStatus,
        config: config,
        setInputValue: setInputValue,
        executeInput: _executeInput,
      }
    }
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
