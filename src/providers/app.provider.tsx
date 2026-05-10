import { FunctionComponent, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../context/index.js';
import { ApiStatus, AppMode, Block, Config, Credentials, LoginStatus, ServerStatus } from '../types.js';
import { commands } from '../commands/index.js';
import { ApiClient } from '../api/index.js';
import { nanoid } from 'nanoid';
import { useApp, useInput } from 'ink';
import { ping } from '@network-utils/tcp-ping';
import keytar from 'keytar';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

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

  const [mode, setMode] = useState<AppMode>('starting');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const [serverStatus, setServerStatus] = useState<ServerStatus | undefined>();
  const [apiStatus, setApiStatus] = useState<ApiStatus | undefined>();
  const [loginStatus, setLoginStatus] = useState<LoginStatus | undefined>();

  const [config, setConfig] = useState<Config | undefined>();
  const [credentials, setCredentials] = useState<Credentials | undefined>();

  const apiClient = useMemo<ApiClient | undefined>(() => {
    // Check if the config has been set
    // before initialising the `ApiClient`
    if (config != null) {
      return new ApiClient(config.host, config.port);
    }
  }, [config]);

  /**
   * Used to load the config and
   * credentials when the app strats
   */
  const _onStart = async (): Promise<void> => {
    const config = _getConfig();
    const credentials = await _getCredentials();

    // If both the config and credentials have not been set then it's pointless setting state for either
    // The checks can just be skipped by setting the app mode to `idle` now
    if (config == null && credentials == null) {
      setMode('idle');
      return;
    }

    setMode('checking');
    setConfig(config);
    setCredentials(credentials);
  };

  /**
   * Used to perform the necessary
   * server, API and login checks
   */
  const _performChecks = async (): Promise<void> => {
    // If the app is not in the checking state then
    // return early to avoid checking too early
    if (mode !== 'checking') {
      return;
    }

    // Reset the status state before
    // running the below checks
    setApiStatus(undefined);
    setLoginStatus(undefined);

    // Only reset the server status state
    // if the server is not restarting
    if (serverStatus !== 'restarting') {
      setServerStatus(undefined);
    }

    try {
      if (config == null) {
        return;
      }

      const { host, port } = config;

      // Get the server status and set it to state
      // Only try to ping once unless the server is restarting
      const status = await _getServerStatus(host, port, (serverStatus !== 'restarting'));
      setServerStatus(status);

      if (status === 'down') {
        return;
      }

      // Get the API status from the
      // API client and set it to state
      const apiStatus = await apiClient?.getStatus();
      setApiStatus(apiStatus);

      if (apiStatus === 'down' || credentials == null) {
        return;
      }

      // Call the API client `login` function with the
      // credentials and set the login status to state
      const loginStatus = await apiClient?.login(credentials);
      setLoginStatus(loginStatus);
    }
    // Once completed the initialisation,
    // set the app mode state to `idle`
    finally {
      setMode('idle');
    }
  };

  /**
   * Obtains the server status by performing a TCP ping
   * using `@network-utils/tcp-ping` under the hood
   *
   * @param host The server host
   * @param port The server port
   * @param tryOnce Indicates if a server ping should be tried once
   *
   * @returns The server status
   */
  const _getServerStatus = async (host: string, port: number, tryOnce: boolean = false): Promise<'up' | 'down'> => {
    const attempts = (tryOnce === true) ? 1 : 20;

    // Loop for the number
    // of ping attempts
    for (let index = 0; index < attempts; index++) {
      const { errors } = await ping({
        address: host,
        port: port,
        // Set to `4` for the first ping to handle ping
        // running too early when server restarts
        attempts: (index === 0 && tryOnce === false) ? 4 : 1,
        timeout: 2000,
      });

      // If there were no errors then
      // the server must be up
      if (errors.length === 0) {
        return 'up';
      }
    }

    // If the loop completed then
    // the server must be down
    return 'down';
  };

  /**
   * Used to get the app `config.json` file
   * from the `.homebridge-cli` directory
   *
   * @return The app config
   */
  const _getConfig = (): Config | undefined => {
    // Define the relative and full file path to the
    // config using the users home directory
    const relativePath = '.homebridge-cli/config.json';
    const fullPath = path.join(os.homedir(), relativePath);

    try {
      // Read and parse the
      // config file data
      const fileData = fs.readFileSync(fullPath, 'utf8');
      return {
        ...JSON.parse(fileData) as Config,
        filePath: `~/${relativePath}`,
      };
    }
    catch {
      // The config may not exist so if the
      // file cannot be open then return
      return;
    }
  };

  /**
   * Used to set the app `config.json` file
   * to the `.homebridge-cli` directory
   *
   * @param host The server host
   * @param port The server port
   */
  const _setConfig = (host: string, port: number): void => {
    // Define the relative and full file path to the
    // config using the users home directory
    const relativePath = '.homebridge-cli/config.json';
    const fullPath = path.join(os.homedir(), relativePath);

    const config: Config = {
      host: host,
      port: port,
      filePath: `~/${relativePath}`,
    };

    // Stringify the config data ready
    // to be written to the file
    const data = JSON.stringify(config);

    // Create the `~/.homebridge-cli` directory
    // if it doesn't already exist
    fs.mkdirSync(path.dirname(fullPath), {
      recursive: true,
    });

    // Write the data to the file
    // and set the config to state
    fs.writeFileSync(fullPath, data, 'utf8');

    setMode('checking');
    setConfig(config);
  };

  /**
   * Used to get the server login
   * credentials from `keytar`
   *
   * @return The credentials
   */
  const _getCredentials = async (): Promise<Credentials | undefined> => {
    // Find all credentials and check
    // if at least one exists
    const credentials = await keytar.findCredentials('homebridge-cli');
    if (credentials.length === 0) {
      return;
    }

    // There should only be one set of credentials,
    // however the latest ones should be used
    const [{ account, password }] = credentials.slice(-1);
    return {
      username: account,
      password: password,
    };
  };

  /**
   * Used to set the server login
   * credentials using `keytar`
   *
   * @param username The username
   * @param password The password
   */
  const _setCredentials = async (username: string, password: string): Promise<void> => {
    await keytar.setPassword('homebridge-cli', username, password);

    // If the credentials have already been set then remove
    // the old ones from keytar to stop multiple existing
    if (credentials != null) {
      await keytar.deletePassword('homebridge-cli', credentials.username);
    }

    // Set the credentials to
    // state once stored
    setMode('checking');
    setCredentials({
      username: username,
      password: password,
    });
  };

  /**
   * Used to remove the server login
   * credentials from `keytar` and state
   */
  const _removeCredentials = async (): Promise<void> => {
    if (credentials == null) {
      return;
    }

    // Remove the current
    // credentials from keytar
    await keytar.deletePassword('homebridge-cli', credentials.username);

    // Clear auth from the API client
    // and disconnect from all sockets
    await apiClient?.clearAuth();
    await apiClient?.socket.disconnect();

    setMode('checking');
    setCredentials(undefined);
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
      // Check if the user wants to clear the blocks, perform this
      // within the `try` block so the `finally` blocks runs
      if (input === 'clear') {
        setBlocks([]);
        return;
      }

      if (input.startsWith('/') === false) {
        throw new Error(`Command must start with a "/"`);
      }

      // Attempt to find a command that matches
      // the users input via its invoke value
      const command = commands.find((command) => command.invoke === input);

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

  /**
   * Used to exit and close the active
   * command and reset the app state
   *
   * @param text The exit text for the command
   */
  const _exit = (text: string): void => {
    // Set the app mode to `idle` only if
    // the mode is currently set to running
    setMode((previous) => {
      return (previous === 'running') ? 'idle' : previous;
    });

    // Set the active block exit text which will be
    // rendered once the app mode is set back to `idle`
    setBlocks((previous) => {
      return previous.map((block) => {
        return (block.id === blocks.at(-1)?.id)
          ? {
              ...block,
              exitText: text,
            }
          : block;
      });
    });
  };

  /**
   * Used to restart the server based on
   * the server system runtime
   *
   * - `docker` - Will restart the Docker container
   * - `linux` - Will restart the Linux host
   */
  const _restartServer = async (): Promise<void> => {
    if (apiClient == null) {
      return;
    }

    // Fetch the server info to check the runtime which
    // will determine how the server is restarted
    const { system } = await apiClient.getServerInfo();
    const { runtime } = system;

    if (runtime === 'docker') {
      await apiClient.restartDockerContainer();
    }

    if (runtime === 'linux') {
      await apiClient.restartLinuxHost();
    }

    setServerStatus('restarting');
    setMode('checking');
  };

  /**
   * Used to call the `_onStart` function
   * on mount when the app starts
   */
  useEffect(() => void _onStart(), []);

  /**
   * Used to call the `_performChecks` function
   * when the config or credentials change
   */
  useEffect(() => void _performChecks(), [config, credentials]);

  /**
   * Used to call the `_performChecks` function when
   * the server status changes to `restarting`
   */
  useEffect(() => {
    if (serverStatus === 'restarting') {
      void _performChecks();
    }
  }, [serverStatus]);

  /**
   * Used to monitor the user input and take
   * acton based on the keys pressed
   */
  useInput((_, key) => {
    // Check if the user has closed the
    // command by pressing the escape key
    if (key.escape === true) {
      _exit('Closed by user');
    }
  }, {
    isActive: (mode !== 'idle'),
  });

  return (
    <AppContext.Provider value={
      {
        ...(mode === 'running') && {
          activeBlockId: blocks.at(-1)?.id,
        },
        mode: mode,
        blocks: blocks,
        inputValue: inputValue,
        serverStatus: serverStatus,
        apiStatus: apiStatus,
        loginStatus: loginStatus,
        config: config,
        credentials: credentials,
        apiClient: apiClient,
        setInputValue: setInputValue,
        setConfig: _setConfig,
        setCredentials: _setCredentials,
        removeCredentials: _removeCredentials,
        executeInput: _executeInput,
        exit: _exit,
        restartServer: _restartServer,
      }
    }
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
