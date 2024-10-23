import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="alert"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="warning" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabLayout;
