import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export const signOut = async () => {
  const auth = getAuth();
  try {
    await auth.signOut();
    // After signing out, router will automatically redirect to login
    // because of the auth state change listener in index.tsx
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
