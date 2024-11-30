import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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


interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isUserLoading: boolean;
    setIsUserLoading: (isLoading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, isUserLoading, setIsUserLoading }}>
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
