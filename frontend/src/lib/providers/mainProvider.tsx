"use client";
import { User } from "@prisma/client";
import { LoadingProvider } from "./loading-provider";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "./user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type MainProviderProps = {
    children: React.ReactNode;
    user: User | null;
};

const queryClient = new QueryClient();

export function MainProvider({ children, user }: MainProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider user={user}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    // enableSystem
                    themes={["light"]}
                    disableTransitionOnChange
                >
                    <LoadingProvider>{children}</LoadingProvider>
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
