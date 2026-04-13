/**
 * Describes the API request options
 *
 * - Generic type `T` for the request body
 */
export type RequestOptions<T extends object = never> = GetRequestOptions | PostRequestOptions<T>;

/**
 * Describes the API request options
 * for a `GET` request
 */
export interface GetRequestOptions {
  readonly method: 'get';
  readonly endpoint: string;
}

/**
 * Describes the API request options
 * for a `POST` request
 *
 * - Generic type `T` for the request body
 */
export interface PostRequestOptions<T extends object> {
  readonly method: 'post';
  readonly endpoint: string;
  readonly body: T;
}

/**
 * Describes the response for
 * the `POST /api/login` endpoint
 */
export interface LoginResponse {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly access_token: string;
}

/**
 * Describes the server info response
 * for the `GET /status/server-information` endpoint
 */
export interface ServerInfoResponse {
  readonly serviceUser: string;
  readonly homebridgeConfigJsonPath: string;
  readonly homebridgeStoragePath: string;
  readonly os: {
    readonly platform: string;
    readonly distro: string;
    readonly kernel: string;
    readonly arch: string;
    readonly hostname: string;
  };
  readonly network: {
    readonly iface: string;
    readonly ip4: string;
    readonly ip4subnet: string;
    readonly ip6: string;
    readonly ip6subnet: string;
    readonly mac: string;
    readonly type: string;
    readonly duplex: string;
    readonly speed: number;
    readonly dnsSuffix: string;
  };
}
