import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2e64e5',
        tabBarStyle: { backgroundColor: '#fefefe', borderTopColor: '#fefefe' },
      }}
    >
      <Tabs.Screen
        name="home_screen"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="discover_screen"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="chat_screen"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses" color={color} size={size} />
          )
        }}
        />

      <Tabs.Screen
        name="profile_screen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />

    </Tabs>

  )
}