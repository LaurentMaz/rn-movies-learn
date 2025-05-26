import { useEffect, useState } from 'react';

/**
 * Custom React hook for fetching data asynchronously with loading and error state management.
 *
 * @template T The type of the data to be fetched.
 * @param fetchFunction - An asynchronous function that returns a Promise resolving to the data of type T.
 * @param autoFetch - Optional boolean to automatically fetch data on mount. Defaults to true.
 * @returns An object containing:
 *   - `data`: The fetched data or null if not yet fetched.
 *   - `loading`: Boolean indicating if the fetch is in progress.
 *   - `error`: Any error encountered during fetching, or null.
 *   - `refetch`: Function to manually trigger the fetch.
 *   - `reset`: Function to reset the state to initial values.
 *
 * @example
 * const { data, loading, error, refetch, reset } = useFetch(() => fetchUser(userId));
 */
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const results = await fetchFunction();
      setData(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occured'));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
