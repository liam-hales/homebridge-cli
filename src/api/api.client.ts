import { ApiStatus, Credentials, LoginStatus } from '../types.js';
import { RequestOptions, ErrorResponse, User, ServerInfo, NodejsInfo, HomebridgeInfo, Pairing, ConfigBackup, ServerBackup, ServerUptime, CpuUsage, MemoryUsage, ConfigData, InstalledPlugin, ChildBridge, Accessory, ServerNetworkOverview } from './types.js';
import { loginSchema, userSchema, serverInfoSchema, serverNetworkOverviewSchema, nodejsInfoSchema, homebridgeInfoSchema, pairingSchema, configBackupSchema, serverBackupSchema, serverUptimeSchema, cpuUsageSchema, memoryUsageSchema, installedPluginSchema, childBridgeSchema, accessorySchema } from './schemas/index.js';
import { z } from 'zod';
import { SocketClient, ApiError } from './index.js';
import date, { type Date } from '../date.js';

/**
 * The client used to interact with the Homebridge API and provide a one-to-one mapping
 * of functions to endpoints, acting as a typed, local interface to the remote API.
 */
class ApiClient {
  private readonly _host: string;
  private readonly _port: number;
  private readonly _socketClient: SocketClient;
  private _authToken?: string;

  /**
   * Construct the `ApiClient`
   *
   * @param host The server host
   * @param port The server port
   */
  public constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
    this._socketClient = new SocketClient(host, port, () => this._authToken);
  }

  /**
   * The socket client used to interact
   * with the Homebridge sockets
   */
  public get socket(): SocketClient {
    return this._socketClient;
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
   * Used to obtain an auth access token from
   * the `POST /api/login` endpoint
   *
   * @param credentials The user credentials to use
   * @returns The login status
   */
  public async login(credentials: Credentials): Promise<LoginStatus> {
    const { username, password } = credentials;

    try {
      const data = await this._request<z.input<typeof loginSchema>, Credentials>({
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
    catch (error) {
      // Check if the error is
      // a known API error
      if (error instanceof ApiError) {
        const { statusCode } = error;

        // If the status code is `412` then the user
        // has 2FA enabled which is not supported
        if (statusCode === 412) {
          return '2fa-enabled';
        }
      }

      return 'failed';
    }
  }

  /**
   * Used to obtain the users data from
   * the `GET /api/users` endpoint
   *
   * @returns The user data
   */
  public async getUsers(): Promise<User[]> {
    const data = await this._request<z.input<typeof userSchema>[]>({
      method: 'get',
      endpoint: '/users',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => userSchema.parse(item));
  }

  /**
   * Used to obtain the server info data from
   * the `GET /status/server-information` endpoint
   *
   * @returns The server info data
   */
  public async getServerInfo(): Promise<ServerInfo> {
    const data = await this._request<z.input<typeof serverInfoSchema>>({
      method: 'get',
      endpoint: '/status/server-information',
    });

    // Parse and return the data using
    // the schema to transform the data
    return serverInfoSchema.parse(data);
  }

  /**
   * Used to obtain the server network overview data from
   * the `GET /api/server/network/overview` endpoint
   *
   * @returns The server network overview data
   */
  public async getServerNetworkOverview(): Promise<ServerNetworkOverview> {
    const data = await this._request<z.input<typeof serverNetworkOverviewSchema>>({
      method: 'get',
      endpoint: '/server/network/overview',
    });

    // Parse and return the data using
    // the schema to transform the data
    return serverNetworkOverviewSchema.parse(data);
  }

  /**
   * Used to obtain the server backups data from
   * the `GET /api/backup/scheduled-backups` endpoint
   *
   * @returns The server backups data
   */
  public async getServerBackups(): Promise<ServerBackup[]> {
    const data = await this._request<z.input<typeof serverBackupSchema>[]>({
      method: 'get',
      endpoint: '/backup/scheduled-backups',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => serverBackupSchema.parse(item));
  }

  /**
   * Used to obtain the next scheduled backup date from
   * the `GET /api/backup/scheduled-backups/next` endpoint
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
   * Used to obtain the server uptime data from
   * the `GET /api/status/uptime` endpoint
   *
   * @returns The server uptime data
   */
  public async getServerUptime(): Promise<ServerUptime> {
    const data = await this._request<z.input<typeof serverUptimeSchema>>({
      method: 'get',
      endpoint: '/status/uptime',
    });

    // Parse and return the data using
    // the schema to transform the data
    return serverUptimeSchema.parse(data);
  }

  /**
   * Used to obtain the Node.js info data from
   * the `GET /status/nodejs` endpoint
   *
   * @returns The Node.js info data
   */
  public async getNodejsInfo(): Promise<NodejsInfo> {
    const data = await this._request<z.input<typeof nodejsInfoSchema>>({
      method: 'get',
      endpoint: '/status/nodejs',
    });

    // Parse and return the data using
    // the schema to transform the data
    return nodejsInfoSchema.parse(data);
  }

  /**
   * Used to obtain the Homebridge info data from
   * the `GET /api/status/homebridge-version` endpoint
   *
   * @returns The Homebridge info data
   */
  public async getHomebridgeInfo(): Promise<HomebridgeInfo> {
    const data = await this._request<z.input<typeof homebridgeInfoSchema>>({
      method: 'get',
      endpoint: '/status/homebridge-version',
    });

    // Parse and return the data using
    // the schema to transform the data
    return homebridgeInfoSchema.parse(data);
  }

  /**
   * Used to obtain the pairings data from
   * the `GET /api/server/pairings` endpoint
   *
   * @returns The pairings data
   */
  public async getPairings(): Promise<Pairing[]> {
    const data = await this._request<z.input<typeof pairingSchema>[]>({
      method: 'get',
      endpoint: '/server/pairings',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => pairingSchema.parse(item));
  }

  /**
   * Used to obtain the config from
   * the `GET /api/config-editor` endpoint
   *
   * @returns The config
   */
  public async getConfig(): Promise<ConfigData> {
    return this._request<ConfigData>({
      method: 'get',
      endpoint: '/config-editor',
    });
  }

  /**
   * Used to obtain the config backups data from
   * the `GET /api/config-editor/backups` endpoint
   *
   * @returns The config backups data
   */
  public async getConfigBackups(): Promise<ConfigBackup[]> {
    const data = await this._request<z.input<typeof configBackupSchema>[]>({
      method: 'get',
      endpoint: '/config-editor/backups',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => configBackupSchema.parse(item));
  }

  /**
   * Used to obtain the CPU usage data from
   * the `GET /api/status/cpu` endpoint
   *
   * @returns The CPU usage data
   */
  public async getCpuUsage(): Promise<CpuUsage> {
    const data = await this._request<z.input<typeof cpuUsageSchema>>({
      method: 'get',
      endpoint: '/status/cpu',
    });

    // Parse and return the data using
    // the schema to transform the data
    return cpuUsageSchema.parse(data);
  }

  /**
   * Used to obtain the memory usage data from
   * the `GET /api/status/ram` endpoint
   *
   * @returns The memory usage data
   */
  public async getMemoryUsage(): Promise<MemoryUsage> {
    const data = await this._request<z.input<typeof memoryUsageSchema>>({
      method: 'get',
      endpoint: '/status/ram',
    });

    // Parse and return the data using
    // the schema to transform the data
    return memoryUsageSchema.parse(data);
  }

  /**
   * Used to obtain the installed plugins data
   * from the `GET /api/plugins` endpoint
   *
   * @returns The installed plugins data
   */
  public async getInstalledPlugins(): Promise<InstalledPlugin[]> {
    const data = await this._request<z.input<typeof installedPluginSchema>[]>({
      method: 'get',
      endpoint: '/plugins',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => installedPluginSchema.parse(item));
  }

  /**
   * Used to obtain the child bridges data from
   * the `GET /api/status/homebridge/child-bridges` endpoint
   *
   * @returns The child bridges data
   */
  public async getChildBridges(): Promise<ChildBridge[]> {
    const data = await this._request<z.input<typeof childBridgeSchema>[]>({
      method: 'get',
      endpoint: '/status/homebridge/child-bridges',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => childBridgeSchema.parse(item));
  }

  /**
   * Used to obtain the accessories data from
   * the `GET /api/accessories` endpoint
   *
   * @returns The accessories data
   */
  public async getAccessories(): Promise<Accessory[]> {
    const data = await this._request<z.input<typeof accessorySchema>[]>({
      method: 'get',
      endpoint: '/accessories',
    });

    // Parse and return the data using
    // the schema to transform the data
    return data.map((item) => accessorySchema.parse(item));
  }

  /**
   * Used to restart the Docker container using the
   * `PUT /platform-tools/docker/restart-container` endpoint
   */
  public async restartDockerContainer(): Promise<void> {
    await this._request({
      method: 'put',
      endpoint: '/platform-tools/docker/restart-container',
    });
  }

  /**
   * Used to restart the linux host using the
   * `PUT /platform-tools/docker/restart-container` endpoint
   */
  public async restartLinuxHost(): Promise<void> {
    await this._request({
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
  private async _request<T extends object, B extends object = never>(options: RequestOptions<B>): Promise<T> {
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

    // Unwrap the response
    // body as JSON
    const body = await response.json();

    // Check if the request was successful, if not extract the
    // message from the error response and throw an error
    if (response.ok === false) {
      const { message } = body as ErrorResponse;
      throw new ApiError(message, {
        method: method,
        endpoint: endpoint,
        statusCode: response.status,
      });
    }

    return body as T;
  }
}

export default ApiClient;
