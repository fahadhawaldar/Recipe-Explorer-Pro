import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { setUser as setRUser } from "@/src/store/slices/authSlice";

export default function Index() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    setUser(user);
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect based on authentication state
  if (user) {
    dispatch(setRUser(user));
    // If user is logged in, redirect to home screen
    return <Redirect href="/(tabs)/home" />;
  } else {
    // If user is not logged in, redirect to login screen
    return <Redirect href="/(auth)/login" />;
  }
}
