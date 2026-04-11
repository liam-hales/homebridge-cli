import { AppMode, Block, Config, Credentials, ServerStatus, ApiStatus, LoginStatus } from '../types.js';
import { ApiClient } from '../clients/index.js';

/**
 * Describes the app state
 * for the `AppContext`
 */
export interface AppState {
  readonly mode: AppMode;
  readonly blocks: Block[];
  readonly inputValue: string;
  readonly activeBlockId?: string;
  readonly serverStatus?: ServerStatus;
  readonly apiStatus?: ApiStatus;
  readonly loginStatus?: LoginStatus;
  readonly config?: Config;
  readonly credentials?: Credentials;
  readonly apiClient?: ApiClient;
}

/**
 * Describes the app actions
 * for the `AppContext`
 */
export interface AppActions {
  /**
   * Used to set the
   * app mode
   *
   * @param mode The app mode
   */
  readonly setMode: (mode: AppMode) => void;

  /**
   * Used to set the
   * input value
   *
   * @param value The new input value
   */
  readonly setInputValue: (value: string) => void;

  /**
   * Used to set the app `config.json` file
   * to the `.homebridge-cli` directory
   *
   * @param host The server host
   * @param port The server port
   */
  readonly setConfig: (host: string, port: number) => void;

  /**
   * Used to set the Homebridge server login
   * credentials using `keytar` under the hood
   *
   * @param username The username
   * @param password The password
   */
  readonly setCredentials: (username: string, password: string) => Promise<void>;

  /**
   * Used to remove the server login
   * credentials from `keytar` and state
   */
  readonly removeCredentials: () => Promise<void>;

  /**
   * Used to validate and
   * execute a given input
   *
   * @param input The input
   */
  readonly executeInput: (input: string) => void;
}
