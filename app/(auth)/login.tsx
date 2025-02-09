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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../_layout";
import { accentColor, darkColor, lightColor } from "@/src/utils/color";
import StyledText from "@/src/components/StyledText";
import { useSelector } from "react-redux";

export default function LoginScreen() {
  const isDark = useSelector((state: any) => state.appSettings.darkMode);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/home"); // Navigate to Home after login
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
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
          source={require("../../assets/images/Login.jpg")}
        />
        <Text style={[styles.logo, { color: accentColor }]}>
          Recipe Explorer Pro
        </Text>
        <StyledText style={styles.title}>Login</StyledText>

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
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    // flex: 1,
    padding: 20,
    borderRadius: 8,
    // backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: accentColor,
  },
  button: {
    backgroundColor: accentColor,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    marginTop: 10,
    color: accentColor,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 200,
    borderWidth: 10,
    borderColor: accentColor,
    alignSelf: "center",
    marginBottom: 20,
    // }
  },
});
