import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../_layout";
import { accentColor, darkColor, lightColor } from "@/src/utils/color";
import StyledText from "@/src/components/StyledText";
import { styles } from "./login";
import { useSelector } from "react-redux";

export default function SignUpScreen() {
  const isDark = useSelector((state: any) => state.appSettings.darkMode);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created! You can now log in.");
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[
        styles.container,
        { backgroundColor: isDark ? darkColor : lightColor },
      ]}
    >
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={require("../../assets/images/Signup.jpg")}
        />
        <Text style={[styles.logo, { color: accentColor }]}>
          Recipe Explorer Pro
        </Text>
        <StyledText style={styles.title}>Sign Up</StyledText>

        <TextInput
          placeholder="Email"
          style={[styles.input, { color: isDark ? "#fff" : "#333" }]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={[styles.input, { color: isDark ? "#fff" : "#333" }]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3A7D44" }]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing in..." : "Sign up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
