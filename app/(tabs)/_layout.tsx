import { TabBarIcon } from "@/components/TabBarIcon";
import { Tabs } from "expo-router";

export default function HomeTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
          boxShadow: "0 0 12px rgba(0,0,0,0.4)",
          paddingBottom: 6,
        },
        tabBarActiveTintColor: "#000", //"#1b5eb0",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontFamily: "TitleFont",
          fontSize: 13,
          top: 6,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: "¡DESCUBRE!",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "tennisball" : "tennisball-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="socials"
        options={{
          title: "SOCIAL",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "MI PERFIL",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              size={focused ? 32 : 26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
