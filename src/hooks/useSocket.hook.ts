import { useEffect, useState } from 'react';
import { SocketEvent } from '../api/types.js';

/**
 * Describes the result returned
 * by the `useSocket` hook
 *
 * - Generic type `T` for the message data
 */
interface SocketResult<T> {
  readonly isConnecting: boolean;
  readonly messages: T[];
  readonly error?: Error;
}

/**
 * Executes a given async generator function used to consume socket
 * events and handles the connecting, messages and error state
 *
 * - Generic type `T` for the message data
 *
 * @param fn The function used to open the socket event stream
 * @returns The socket result
 */
const useSocket = <T>(fn: () => AsyncGenerator<SocketEvent<T>>): SocketResult<T> => {
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [messages, setMessages] = useState<T[]>([]);
  const [error, setError] = useState<Error | undefined>();

  /**
   * Used to call the `fn` function on mount and consume the socket
   * events to update the connecting, messages and error state
   */
  useEffect(() => {
    const generator = fn();

    void (async (): Promise<void> => {
      try {
        for await (const event of generator) {
          // Process each socket
          // event type
          switch (event.type) {
            case 'connected':
            case 'disconnected': {
              setIsConnecting(false);
              break;
            }

            case 'message': {
              setMessages((previous) => [
                ...previous,
                event.data,
              ]);

              break;
            }

            case 'error': {
              setError(event.error);
              break;
            }
          }
        }
      }
      catch (error) {
        if (error instanceof Error) {
          setError(error);
          return;
        }

        // Throw the unknow error if
        // it cannot be handled
        throw error;
      }
    })();

    // Close the generator on unmount so the
    // socket listeners are cleaned up
    return (): void => {
      void generator.return(undefined);
    };
  }, []);

  return {
    isConnecting: isConnecting,
    messages: messages,
    error: error,
  };
};

export default useSocket;
