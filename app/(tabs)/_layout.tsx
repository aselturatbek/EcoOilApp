import { Tabs } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Feather from 'react-native-vector-icons/Feather';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#6fdb64', // Color when tab is selected
          tabBarStyle: {
            backgroundColor: "#F6E96B", 
            position: 'absolute',
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
            height: 90,
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 0,
            zIndex: 0,
            shadowOffset: { width: 0, height: 0 }, // Remove shadow for iOS
            shadowOpacity: 0, // Remove shadow for iOS
            shadowRadius: 0, // Remove shadow for iOS
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="LocationScreen"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'location' : 'location-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="GiftScreen"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'gift' : 'gift-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <Feather name={focused ? 'user' : 'user'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <TouchableOpacity style={styles.fab1} >
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={() => console.log('FAB Pressed!')}>
        <Feather name="plus" size={30} color='white' />
      </TouchableOpacity>
     
      
    </View>
  );
}

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
  fab1:{
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
