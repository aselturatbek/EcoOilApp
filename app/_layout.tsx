import React, { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, View } from 'react-native';
import { UserProvider } from './auth/UserContext'; // UserProvider doğru yoldan içe aktarılıyor
import { AuthenticatedStack, UnauthenticatedStack } from './Stacks';
import { useUser } from './auth/UserContext';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/monsterrat/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/monsterrat/Montserrat-Bold.ttf'),
        'Montserrat-Light': require('../assets/fonts/monsterrat/Montserrat-ExtraLight.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return (
        <UserProvider>
            <AppContent fontsLoaded={fontsLoaded} />
        </UserProvider>
    );
}

function AppContent({ fontsLoaded }: { fontsLoaded: boolean }) {
    const { user, isUserLoading } = useUser();

    if (!fontsLoaded || isUserLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer theme={DefaultTheme}>
            {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>
    );
}
