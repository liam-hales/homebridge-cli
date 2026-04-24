import { ApiStatus, Credentials, LoginStatus } from '../types.js';
import { RequestOptions, User, ServerInfo, NodejsInfo, Pairing, ConfigBackup, ServerBackup, CpuUsage, MemoryUsage, ConfigData, InstalledPlugin } from './types.js';
import { loginSchema, userSchema, serverInfoSchema, nodejsInfoSchema, pairingsSchema, configBackupsSchema, serverBackupSchema, cpuUsageSchema, memoryUsageSchema, installedPluginsSchema } from './schemas/index.js';
import date, { type Date } from '../date.js';

/**
 * The client used to interact with the Homebridge API and provide a one-to-one mapping
 * of functions to endpoints, acting as a typed, local interface to the remote API.
 */
class ApiClient {
  private readonly _host: string;
  private readonly _port: number;
  private _authToken?: string;

  /**
   * Construct the `ApiService`
   *
   * @param host The server host
   * @param port The server port
   */
  public constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
  }

  /**
   * Used to clear authentication by
   * resetting the auth access token
   */
  public async clearAuth(): Promise<void> {
    this._authToken = undefined;
  }

  /**
   * Obtains the API status by checking if the
   * `/api` route returns the correct response
   *
   * @returns The API status
   */
  public async getStatus(): Promise<ApiStatus> {
    try {
      // Make a request to the `/api` endpoint
      // to check if the API is up
      const response = await fetch(`http://${this._host}:${this._port}/api`);
      const text = await response.text();

      // If the response is "Hello World!" with a
      // `200` status code then the API is up
      return (
        response.status === 200 &&
        text === 'Hello World!'
      )
        ? 'up'
        : 'down';
    }
    // Catch any error that occurs while making the
    // request and return the `down` status
    catch {
      return 'down';
    }
  }

  /**
   * Used to call the `POST /api/login` endpoint
   * and obtain an auth access token
   *
   * @param credentials The user credentials to use
   * @returns The login status
   */
  public async login(credentials: Credentials): Promise<LoginStatus> {
    const { username, password } = credentials;

    try {
      const data = await this._request<unknown, Credentials>({
        method: 'post',
        endpoint: '/auth/login',
        body: {
          username: username,
          password: password,
        },
      });

      // Parse and store the access token so
      // it can be used for other requests
      const { accessToken } = loginSchema.parse(data);
      this._authToken = accessToken;

      return 'authenticated';
    }
    // Catch any error that occurs while making the
    // request and return the `failed` status
    catch {
      return 'failed';
    }
  }

  /**
   * Used to call the `GET /api/users` endpoint
   * and obtain the user data
   *
   * @returns The user data
   */
  public async getUsers(): Promise<User[]> {
    const data = await this._request<unknown[]>({
      method: 'get',
      endpoint: '/users',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => userSchema.parse(item));
  }

  /**
   * Used to call the `GET /status/server-information` endpoint
   * and obtain the server info data
   *
   * @returns The server info data
   */
  public async getServerInfo(): Promise<ServerInfo> {
    const data = await this._request<unknown>({
      method: 'get',
      endpoint: '/status/server-information',
    });

    // Parse and return the data using
    // the schema to transform the data
    return serverInfoSchema.parse(data);
  }

  /**
   * Used to call the `GET /api/backup/scheduled-backups` endpoint
   * and obtain the server backups data
   *
   * @returns The server backups data
   */
  public async getServerBackups(): Promise<ServerBackup[]> {
    const data = await this._request<unknown[]>({
      method: 'get',
      endpoint: '/backup/scheduled-backups',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => serverBackupSchema.parse(item));
  }

  /**
   * Used to call the `GET /api/backup/scheduled-backups/next` endpoint
   * and obtain the next scheduled backup date
   *
   * @returns The next scheduled backup date
   */
  public async getNextServerBackup(): Promise<Date> {
    const { next } = await this._request<{ readonly next: string; }>({
      method: 'get',
      endpoint: '/backup/scheduled-backups/next',
    });

    return date.utc(next);
  }

  /**
   * Used to call the `GET /status/nodejs` endpoint
   * and obtain the Node.js info data
   *
   * @returns The Node.js info data
   */
  public async getNodejsInfo(): Promise<NodejsInfo> {
    const data = await this._request<unknown>({
      method: 'get',
      endpoint: '/status/nodejs',
    });

    // Parse and return the data using
    // the schema to transform the data
    return nodejsInfoSchema.parse(data);
  }

  /**
   * Used to call the `GET /api/server/pairings` endpoint
   * and obtain the pairings data
   *
   * @returns The pairings data
   */
  public async getPairings(): Promise<Pairing[]> {
    const data = await this._request<unknown[]>({
      method: 'get',
      endpoint: '/server/pairings',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => pairingsSchema.parse(item));
  }

  /**
   * Used to call the `GET /api/config-editor` endpoint
   * and obtain the Homebridge config
   *
   * @returns The Homebridge config
   */
  public async getConfig(): Promise<ConfigData> {
    return this._request<ConfigData>({
      method: 'get',
      endpoint: '/config-editor',
    });
  }

  /**
   * Used to call the `GET /api/config-editor/backups` endpoint
   * and obtain the config backups data
   *
   * @returns The config backups data
   */
  public async getConfigBackups(): Promise<ConfigBackup[]> {
    const data = await this._request<unknown[]>({
      method: 'get',
      endpoint: '/config-editor/backups',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => configBackupsSchema.parse(item));
  }

  /**
   * Used to call the `GET /api/status/cpu` endpoint
   * and obtain the CPU usage data
   *
   * @returns The CPU usage data
   */
  public async getCpuUsage(): Promise<CpuUsage> {
    const data = await this._request<unknown>({
      method: 'get',
      endpoint: '/status/cpu',
    });

    // Parse and return the data using
    // the schema to transform the data
    return cpuUsageSchema.parse(data);
  }

  /**
   * Used to call the `GET /api/status/ram` endpoint
   * and obtain the memory usage data
   *
   * @returns The memory usage data
   */
  public async getMemoryUsage(): Promise<MemoryUsage> {
    const data = await this._request<unknown>({
      method: 'get',
      endpoint: '/status/ram',
    });

    // Parse and return the data using
    // the schema to transform the data
    return memoryUsageSchema.parse(data);
  }

  /**
   * Used to call the `GET /api/plugins` endpoint
   * and obtain the installed plugins data
   *
   * @returns The installed plugins data
   */
  public async getInstalledPlugins(): Promise<InstalledPlugin[]> {
    const data = await this._request<unknown[]>({
      method: 'get',
      endpoint: '/plugins',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => installedPluginsSchema.parse(item));
  }

  /**
   * Used to call the `PUT /platform-tools/docker/restart-container` endpoint
   * and restart the Docker container
   */
  public async restartDockerContainer(): Promise<void> {
    await this._request<unknown[]>({
      method: 'put',
      endpoint: '/platform-tools/docker/restart-container',
    });
  }

  /**
   * Used to call the `PUT /platform-tools/docker/restart-container` endpoint
   * and restart the linux host
   */
  public async restartLinuxHost(): Promise<void> {
    await this._request<unknown[]>({
      method: 'put',
      endpoint: '/platform-tools/linux/restart-host',
    });
  }

  /**
   * Used to make a request to the API and return
   * the response and handle any errors
   *
   * - Generic type `T` for the response
   * - Generic type `B` for the request body
   *
   * @param options The request options
   * @returns The response
   */
  private async _request<T, B extends object = never>(options: RequestOptions<B>): Promise<T> {
    const { method, endpoint } = options;

    // Make the request to the API using
    // the given options and app config
    const response = await fetch(`http://${this._host}:${this._port}/api${endpoint}`, {
      method: method,
      ...(method === 'post') && {
        body: JSON.stringify(options.body),
      },
      ...(method === 'put') && {
        body: '{}',
      },
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'content-type': 'application/json',
        'authorization': `Bearer ${this._authToken ?? ''}`,
      },
    });

    // Check if the request was successful,
    // if not throw an error
    if (response.ok === false) {
      throw new Error(`[API Error]: ${response.status} - /api${endpoint}`);
    }

    // Unwrap the response body
    // as JSON and return it
    return await response.json() as T;
  }
}

export default ApiClient;
