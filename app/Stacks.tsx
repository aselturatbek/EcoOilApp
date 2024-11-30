import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './auth/WelcomeScreen';
import RegisterScreen from './auth/RegisterScreen';
import LoginScreen from './auth/LoginScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export const UnauthenticatedStack = () => (
    <Stack.Navigator initialRouteName="auth/WelcomeScreen">
        <Stack.Screen
            name="auth/WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="auth/RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="auth/LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export const AuthenticatedStack = () => (
    <Stack.Navigator initialRouteName="main">
        <Stack.Screen
            name="main"
            component={TabNavigator}
            options={{ headerShown: false }}
        />
        {/* Diğer modalları buraya ekleyin */}
    </Stack.Navigator>
);
