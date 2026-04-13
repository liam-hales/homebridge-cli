import { useApp } from './index.js';
import { ApiClient } from '../clients/index.js';

/**
 * Used to unwrap and access the `ApiClient`
 * provided by the `AppProvider`
 *
 * @returns The API client
 */
const useApiClient = (): ApiClient => {
  const { apiClient } = useApp();

  // If the API client has not yet been
  // initialised, throw an error
  if (apiClient == null) {
    throw new Error('The "apiClient" has not yet been initialised');
  }

  return apiClient;
};

export default useApiClient;
