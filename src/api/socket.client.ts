import { io, Socket } from 'socket.io-client';
import { SocketStreamOptions, SocketEvent } from './types.js';

/**
 * The client used to interact with the Homebridge `socket.io` sockets and provide a one-to-one mapping
 * of async generators to socket events, acting as a typed, local interface to the remote sockets.
 */
class SocketClient {
  private readonly _host: string;
  private readonly _port: number;
  private readonly _sockets: Map<string, Socket>;
  private readonly _getAuthToken: () => string | undefined;

  /**
   * Construct the `SocketClient`
   *
   * @param host The server host
   * @param port The server port
   * @param getAuthToken The function used to fetch the auth token
   */
  public constructor(host: string, port: number, getAuthToken: () => string | undefined) {
    this._host = host;
    this._port = port;
    this._sockets = new Map();
    this._getAuthToken = getAuthToken;
  }

  /**
   * Used to disconnect
   * all known sockets
   */
  public async disconnect(): Promise<void> {
    for (const socket of this._sockets.values()) {
      socket.disconnect();
    }

    // Clear the sockets map once
    // all have been disconnected
    this._sockets.clear();
  }

  /**
   * Connects to the socket using the given `options`, emits the trigger
   * event and yields any messages received as an async iterable
   *
   * - Generic type `T` for the message data
   *
   * @param options The stream options
   * @returns The async generator that yields received events
   */
  private async* _stream<T>(options: SocketStreamOptions): AsyncGenerator<SocketEvent<T>> {
    const { namespace, listenOn, trigger } = options;

    // Define the event queue and get the
    // socket for the given namespace
    const queue: SocketEvent<T>[] = [];
    const socket = this._getSocket(namespace);

    let signal = Promise.withResolvers<void>();

    /**
     * Used to handle new messages
     * being sent to the client
     *
     * @param data The message data
     */
    const onMessage = (data: T): void => {
      queue.push({
        type: 'message',
        data: data,
      });

      signal.resolve();
    };

    /**
     * Used to handle the
     * socket disconnect
     */
    const onDisconnect = (): void => {
      queue.push({
        type: 'disconnected',
      });

      signal.resolve();
    };

    if (socket.connected === false) {
      try {
        // Use a new promise and the connect event
        // listeners to await the socket connection
        await new Promise<void>((resolve, reject) => {
          socket
            .once('connect', () => resolve())
            .once('connect_error', (error) => reject(error))
            .connect();
        });

        // Once connected yield the
        // connected event
        yield {
          type: 'connected',
        };
      }
      catch (error) {
        // Catch any errors during socket connection
        // and yield the socket error event and return
        if (error instanceof Error) {
          yield {
            type: 'error',
            error: error,
          };

          return;
        }

        throw error;
      }
    }

    // Add the listeners and emit the initial
    // trigger to start the event stream
    socket
      .on(listenOn, onMessage)
      .on('disconnect', onDisconnect)
      .emit(trigger);

    try {
      while (true) {
        // Loop until the message queue is empty
        // and yield each message from the queue
        while (queue.length > 0) {
          const item = queue.shift();

          if (item != null) {
            yield item;
          }
        }

        // If the socket has been
        // disconnected then return
        if (socket.disconnected === true) {
          return;
        }

        // Await the promise and
        // once done reset it
        await signal.promise;
        signal = Promise.withResolvers<void>();
      }
    }
    finally {
      // Remove the listeners
      // from the socket
      socket
        .off(listenOn, onMessage)
        .off('disconnect', onDisconnect);
    }
  }

  /**
   * Used to get a socket for a given namespace
   * either from the map or by creating a new one
   *
   * @param namespace The socket namespace
   * @returns The socket
   */
  private _getSocket(namespace: string): Socket {
    const existing = this._sockets.get(namespace);

    // If the socket already exists
    // in the map then reuse it
    if (existing != null) {
      return existing;
    }

    // Fetch the auth token and create the
    // new socket for the given namespace
    const authToken = this._getAuthToken();
    const socket = io(`http://${this._host}:${this._port}${namespace}`, {
      autoConnect: false,
      query: {
        token: authToken,
      },
    });

    this._sockets.set(namespace, socket);
    return socket;
  }
}

export default SocketClient;
