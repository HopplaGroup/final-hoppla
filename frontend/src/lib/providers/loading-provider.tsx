"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useTransition } from "react";
// import { usePathname, useRouter } from "../i18n";
type LoadingContextType = {
  push: (url: string, locale?: "en" | "ka", doRefresh?: boolean) => void;
  make: (fn: () => Promise<void>) => void;
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within an LoadingProvider");
  }
  return context;
};

type LoadingProviderProps = {
  children: React.ReactNode;
};

export function LoadingProvider({ children }: LoadingProviderProps) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const pathname = usePathname();
  function push(url: string, locale?: "en" | "ka", doRefresh?: boolean) {
    if (url === pathname) {
      return;
    }
    startTransition(() => {
      router.push(url);
      if (doRefresh) {
        router.refresh();
      }
    });
  }

  function make(fn: () => Promise<void>) {
    startTransition(async () => {
      await fn();
    });
  }

  return (
    <LoadingContext.Provider value={{ push, make, isLoading }}>
      {isLoading && (
        <div className="w-full fixed top-0 left-0 z-[999]">
          <div className="h-1.5 w-full bg-primary/10 overflow-hidden">
            <div className="progress w-full h-full bg-primary left-right"></div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
