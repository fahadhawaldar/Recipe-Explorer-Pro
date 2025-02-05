import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const auth = getAuth();

    if (!auth.currentUser) {
      router.replace("/(auth)/login");
    }
  }, []);

  return children;
}
