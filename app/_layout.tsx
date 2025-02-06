import { Stack } from "expo-router";
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import { store } from "../src/store/index";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDGc72C8VfvsADaTilJNOcpLDefbOT8psg",
  authDomain: "recipeexlorerpro.firebaseapp.com",
  projectId: "recipeexlorerpro",
  storageBucket: "recipeexlorerpro.firebasestorage.app",
  messagingSenderId: "156513402836",
  appId: "1:156513402836:web:037a7980541aa39735a041",
  measurementId: "G-V7QSPFYW90",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // ✅ Correct way to use AsyncStorage
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
    },
    tabBarLabelStyle: {
      color: colorScheme === "dark" ? "#fff" : "#333",
    },
    tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#333",
    tabBarInactiveTintColor: colorScheme === "dark" ? "#fff" : "#333",
    headerTintColor: colorScheme === "dark" ? "#fff" : "#333",
    headerStyle: {
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
    },
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user?.email);
    });

    return unsubscribe;
  }, []);
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "modal",
          headerTitle: "Recipe Details",
        }}
      />
    </Stack>
  );
}
