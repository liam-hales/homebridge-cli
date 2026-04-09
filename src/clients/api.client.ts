import { ApiStatus, Credentials, LoginStatus } from '../types.js';
import { LoginResponse, RequestOptions } from './types.js';

/**
 * The client used to interact
 * with the Homebridge API
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
   * Used to call the `POST /api/login` endpoint and obtain
   * an access token to use for other endpoints
   *
   * @param credentials The user credentials to use
   * @returns The login status
   */
  public async login(credentials: Credentials): Promise<LoginStatus> {
    const { username, password } = credentials;

    try {
      const { accessToken } = await this._request<LoginResponse, Credentials>({
        method: 'post',
        endpoint: '/auth/login',
        body: {
          username: username,
          password: password,
        },
      });

      // Store the access token so it can
      // be used for other requests
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
   * Used to make a request to the API and return
   * the response and handle any errors
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
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'content-type': 'application/json',
        'authorization': this._authToken,
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
