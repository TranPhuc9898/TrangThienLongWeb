/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [storeConfig, setStoreConfig] = useState<ReturnType<
    typeof makeStore
  > | null>(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    setIsClient(true);
    setStoreConfig(makeStore());
  }, []);

  if (!isClient || !storeConfig) {
    return (
      <div className="flex items-center justify-center h-96">
        <SpinnerbLoader className="w-10 border-2 border-gray-300 border-r-gray-600" />
      </div>
    );
  }

  return (
    <Provider store={storeConfig.store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-96">
            <SpinnerbLoader className="w-10 border-2 border-gray-300 border-r-gray-600" />
          </div>
        }
        persistor={storeConfig.persistor}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
