import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import WelcomeScreen from './auth/WelcomeScreen';
import RegisterScreen from './auth/RegisterScreen';
import LoginScreen from './auth/LoginScreen';
import Home from './main/HomeScreen'; 
import Location from './main/LocationScreen';
import Profile from './main/ProfileScreen';
import GiftScreen from './main/GiftScreen';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Feather from 'react-native-vector-icons/Feather';

// Tab ve Stack navigatörlerini oluştur
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6fdb64', // Color when tab is selected
          tabBarStyle: {
            backgroundColor: "#F6E96B", 
            position: 'absolute',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: 90,
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 0,
            shadowOffset: { width: 0, height: 0 }, // Remove shadow for iOS
            shadowOpacity: 0, // Remove shadow for iOS
            shadowRadius: 0, // Remove shadow for iOS
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Location"
          component={Location}
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'location' : 'location-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Gift"
          component={GiftScreen}
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'gift' : 'gift-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <Feather name={focused ? 'user' : 'user'} size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity style={styles.fab1}>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={() => console.log('FAB Pressed!')}>
        <Feather name="plus" size={30} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 50, // FAB'ı yukarı taşımak için bottom değerini arttırdık
    left: '50%',
    transform: [{ translateX: -25 }], // FAB'ı yatayda ortalamak için
    backgroundColor: "#6fdb64",
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 0 }, // Remove shadow for iOS
    shadowOpacity: 0.35, // Remove shadow for iOS
    shadowRadius: 4, // Remove shadow for iOS
    zIndex: 1,
  },
  fab1: {
    position: 'absolute',
    bottom: 46, // FAB'ı yukarı taşımak için bottom değerini arttırdık
    left: '49%',
    transform: [{ translateX: -25 }], // FAB'ı yatayda ortalamak için
    backgroundColor: "#F6E96B",
    borderRadius: 25,
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    zIndex: 1,
  }
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/monsterrat/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/monsterrat/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
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
        <Stack.Screen
          name="main"
          component={TabNavigator} // Tab navigatörünü buraya koy
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </ThemeProvider>
  );
}
