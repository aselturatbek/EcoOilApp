import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './main/HomeScreen';
import Location from './main/LocationScreen';
import Profile from './main/ProfileScreen';
import GiftScreen from './main/GiftScreen';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#004d40',
                    tabBarStyle: {
                        backgroundColor: 'white',
                        position: 'absolute',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        height: 90,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        elevation: 0,
                    },
                    headerShown: false,
                }}
            >
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
            <TouchableOpacity style={styles.fab}>
                <Feather name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        transform: [{ translateX: -25 }],
        backgroundColor: '#004d40',
        borderRadius: 25,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default TabNavigator;
