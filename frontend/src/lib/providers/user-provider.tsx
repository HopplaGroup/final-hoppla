"use client";

import { User } from "@prisma/client";
import React, { createContext, useContext } from "react";
import { useFindUniqueUser } from "../hooks";

type UserContextType = {
    user: User | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
};

type UserProviderProps = {
    children: React.ReactNode;
    user: User | null;
};

export function UserProvider({ children, user }: UserProviderProps) {
    return (
        <UserContext.Provider value={{ user: (user || null) as User | null }}>
            {children}
        </UserContext.Provider>
    );
}
