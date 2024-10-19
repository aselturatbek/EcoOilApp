import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    id: number;
    username: string;
    name: string;
    surname: string;
    phone: string;
    profile_photo_url: string;
    role: string;
    email: string;
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
