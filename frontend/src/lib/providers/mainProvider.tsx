"use client";
import { User } from "@prisma/client";
import { UserProvider } from "./user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PushNotificationProvider } from "./push-notification-provider";
import { ThemeProvider  } from "next-themes";

type MainProviderProps = {
    children: React.ReactNode;
    user: User | null;
};

const queryClient = new QueryClient({});

export function MainProvider({ children, user }: MainProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider user={user}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    themes={["light"]}
                    disableTransitionOnChange
                >
                    <PushNotificationProvider>
                        {children}
                    </PushNotificationProvider>
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
