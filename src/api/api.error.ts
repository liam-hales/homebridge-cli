import { RequestMethod } from './types.js';

/**
 * The options used when
 * constructing a new `ApiError`
 */
interface ErrorOptions {
  readonly method: RequestMethod;
  readonly endpoint: string;
  readonly statusCode: number;
}

/**
 * Used to represent an error from an API request
 * which is thrown by the `ApiClient`
 */
class ApiError extends Error {
  private readonly _options: ErrorOptions;

  /**
   * Constructs a new `ApiError` to represent
   * an error from an API request
   *
   * @param message The error message
   * @param options The error options
   */
  public constructor(message: string, options: ErrorOptions) {
    const { method, endpoint, statusCode } = options;

    // Define the full error message using the constructor props
    // and call super with the message
    const errorMessage = `[API Error]: ${statusCode} - ${message} - (${method.toUpperCase()} /api${endpoint})`;
    super(errorMessage);

    this._options = options;
  }

  /**
   * The error status code
   */
  public get statusCode(): number {
    return this._options.statusCode;
  }
}

export default ApiError;
