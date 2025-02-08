import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export const signOut = async () => {
  const auth = getAuth();
  try {
    await auth.signOut();
    router.replace("/(auth)/login");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
