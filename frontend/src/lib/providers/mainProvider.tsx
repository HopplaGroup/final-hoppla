"use client";
import { User } from "@prisma/client";
import { LoadingProvider } from "./loading-provider";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "./user-provider";

type MainProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

export function MainProvider({ children, user }: MainProviderProps) {
  return (
    <UserProvider user={user}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // enableSystem
        themes={["light", "dark"]}
        disableTransitionOnChange
      >
        <LoadingProvider>{children}</LoadingProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
