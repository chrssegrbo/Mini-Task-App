import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF9B51",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-tasks"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => ( 
            <Ionicons name="add-circle" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="task-detail"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="update_task"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: "#F8FAFC",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "700",
  },
});