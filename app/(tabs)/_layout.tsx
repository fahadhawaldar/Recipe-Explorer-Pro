// app/(app)/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { accentColor, darkColor, lightColor } from "@/src/utils/color";
import StyledView from "@/src/components/StyledView";
import { useSelector } from "react-redux";

export default function TabsLayout() {
  const colorScheme = useSelector((state: any) => state.appSettings.darkMode);
  console.log(colorScheme);

  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme ? darkColor : lightColor, // Background color of the tab bar
          elevation: 8, // For Android (higher elevation = more shadow)
          shadowColor: "#000", // Shadow color
          shadowOffset: { width: 0, height: 4 }, // Position of shadow
          shadowOpacity: 0.2, // Transparency of shadow
          shadowRadius: 5, // Blur effect of shadow
          borderTopLeftRadius: 20, // Round top edges
          borderTopRightRadius: 20,
          position: "absolute", // Make it float above the screen
          left: 0,
          right: 0,
          bottom: 0,
          height: 70,
          // paddingTop: 10,
        },
        tabBarLabelStyle: {
          color: colorScheme ? "#fff" : "#333",
        },
        tabBarActiveTintColor: accentColor,
        tabBarInactiveTintColor: "#E6B9A6",
        headerTintColor: colorScheme ? "#fff" : "#333",
        headerStyle: {
          backgroundColor: accentColor,
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Octicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addRecipe"
        options={{
          tabBarButton: ({ onPress }) => (
            <Pressable
              onPress={onPress}
              style={{
                top: -20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: accentColor,
                width: 60,
                height: 60,
                borderRadius: 30,
                elevation: 10,
                shadowColor: "#000", //
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                alignSelf: "center",
              }}
            >
              <Octicons name="plus" size={30} color={"#fff"} />
            </Pressable>
          ),
          title: "Add Recipe",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Octicons name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
