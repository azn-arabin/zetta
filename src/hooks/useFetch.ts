"use client";

import { useState, useEffect, useCallback } from "react";
import { ApiResponse } from "@/types";

interface UseFetchOptions {
  autoFetch?: boolean;
  onError?: (error: string) => void;
}

export function useFetch<T>(
  url: string | null,
  options: UseFetchOptions = {}
): ApiResponse<T> & { refetch: () => void } {
  const { autoFetch = true, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, onError]);

  useEffect(() => {
    if (autoFetch && url) {
      fetchData();
    }
  }, [fetchData, autoFetch, url]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Custom hook specifically for posts
export function usePosts() {
  return useFetch<import("@/types").Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
}

// Custom hook for a single post
export function usePost(id: string | number) {
  return useFetch<import("@/types").Post>(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null
  );
}

// Custom hook for users
export function useUsers() {
  return useFetch<import("@/types").User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
}

// Custom hook for error demonstration
export function useErrorDemo() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerError = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Simulate different types of errors
      const errorTypes = [
        () => fetch("https://jsonplaceholder.typicode.com/invalid-endpoint"),
        () => fetch("https://httpstat.us/500"),
        () => fetch("https://httpstat.us/404"),
        () => Promise.reject(new Error("Network connection failed")),
      ];

      const randomError =
        errorTypes[Math.floor(Math.random() * errorTypes.length)];
      const response = await randomError();

      if (response && !response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const result = await response?.json();
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, refetch: triggerError };
}
