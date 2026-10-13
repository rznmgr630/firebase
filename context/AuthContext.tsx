"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/lib/firebase";


interface AuthContextType {
    user: null | User,
    isLoading: boolean,
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
});

export const AUthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null | User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);

            if (isLoading)
                setIsLoading(false);

            console.log({user})
        });

    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}