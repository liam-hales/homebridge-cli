import { useEffect, useState } from 'react';

/**
 * Describes the result returned
 * by the `useQuery` hook
 *
 * - Generic type `T` for the data
 */
interface QueryResult<T extends object> {
  readonly isLoading: boolean;
  readonly data?: T;
  readonly error?: Error;
}

/**
 * Executes a given function used to fetch data
 * and handles the loading, data and error state
 *
 * - Generic type `T` for the data
 *
 * @param fn The function used to fetch the data
 * @returns The query result
 */
const useQuery = <T extends object>(fn: () => Promise<T>): QueryResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | undefined>();

  /**
   * Used to call the `fn` function on mount and
   * handle the loading, data and error state
   */
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        // Call the `fn` function and set the
        // data to state once it has resolved
        const result = await fn();
        setData(result);
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
      finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading: isLoading,
    data: data,
    error: error,
  };
};

export default useQuery;
