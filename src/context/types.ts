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
   * Used to validate and
   * execute a given input
   *
   * @param input The input
   */
  readonly executeInput: (input: string) => void;
}
