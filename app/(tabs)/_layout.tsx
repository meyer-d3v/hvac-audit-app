import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        //tabBarBackground: () => (
        //  <BlurView tint="light" intensity={80} style={{ flex: 1 }} />
        //),
        //tabBarStyle: Platform.select({
        //  ios: {
            // Use a transparent background on iOS to show the blur effect
         //   position: 'absolute',
        //  },
        //  default: {},
        //}),
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="newAudit"
        options={{
          title: 'New Audit',
          headerShown: false,
          tabBarIcon: ({ color }) => <Fontisto name="plus-a" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="description" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SimpleLineIcons name="settings" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: 'Help',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="help-outline" color={color}/>,
        }}
      />
    </Tabs>

    
  );
}
