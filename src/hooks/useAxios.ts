import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
interface UseAxiosResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  sendRequest: (config?: AxiosRequestConfig) => void;
}

export function useAxios<T = unknown>(
  initialConfig: AxiosRequestConfig
): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (overrideConfig?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        ...initialConfig,
        ...overrideConfig,
      });

      setData(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
}
