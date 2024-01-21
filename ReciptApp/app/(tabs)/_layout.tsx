import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* Tab One */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          // Other options...
        }}
      />
      {/* Tab Two */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Edit',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
          // Other options...
        }}
      />
      {/* Tab Three */}
      <Tabs.Screen
        name="three"
        options={{
          title: 'Result',
          tabBarIcon: ({ color }) => <TabBarIcon name="check-circle" color={color} />,
          // Other options...
        }}
      />
    </Tabs>
  );
}