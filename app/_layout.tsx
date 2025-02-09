import { Stack } from "expo-router";
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { Provider, useDispatch } from "react-redux";
import { store } from "../src/store/index";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { setUser } from "../src/store/slices/authSlice";

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
  const screenOptions = {
    headerShown: false,
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {});

    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
