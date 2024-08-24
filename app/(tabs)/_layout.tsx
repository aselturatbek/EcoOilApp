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
          tabBarActiveTintColor: 'green', // Color when tab is selected
          tabBarStyle: {
            backgroundColor: "#F6E96B", // Transparent background
            borderTopWidth: 10, // Border thickness
            borderTopColor:"#F6E96B", // Border color
            position: 'absolute',
            borderRadius:25,
            
            height: 90,
            left: 0,
            right: 0,
            bottom: 0,
            
            elevation: 0,
            zIndex: 0,
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
    backgroundColor: "green",
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
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
    elevation: 5,
    zIndex: 1,
    
  }
});
