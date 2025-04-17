"use client";
import { User } from "@prisma/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import PushNotificationProvider from "./PushNotificationProvider";
import UserProvider from "./UserProvider";

type MainProviderProps = {
    children: React.ReactNode;
    user: User | null;
};

const queryClient = new QueryClient({});

export default function Providers({ children, user }: MainProviderProps) {
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
