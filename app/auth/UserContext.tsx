import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
    setUser: (user: User | null) => Promise<void>; // AsyncStorage ile uyumlu hale getirildi
    logout: () => Promise<void>; // Kullanıcıyı çıkış yaptırma
    isUserLoading: boolean; // Kullanıcı verileri yükleniyor mu
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

    // Kullanıcı verisini AsyncStorage'a kaydet
    const setUser = async (user: User | null) => {
        setUserState(user);
        if (user) {
            await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
            await AsyncStorage.removeItem("user");
        }
    };

    // Kullanıcıyı çıkış yaptır
    const logout = async () => {
        await AsyncStorage.removeItem("user");
        setUserState(null);
    };

    // Uygulama başladığında kullanıcı verisini yükle
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem("user");
                if (userData) {
                    setUserState(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Failed to load user from AsyncStorage:", error);
            } finally {
                setIsUserLoading(false); // Veriler yüklendi
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logout, isUserLoading }}>
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
