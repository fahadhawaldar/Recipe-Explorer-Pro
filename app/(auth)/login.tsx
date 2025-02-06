import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../_layout";

export default function LoginScreen() {
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
    <ImageBackground
      // source={require("../../assets/images/login-background.jpg")}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      > */}
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            // ref={(node) => node && node.focus()}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
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

          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.link}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    // backgroundColor: "rgba(221, 202, 202, 0.28)",
  },
  form: {
    width: "100%",
    // flex: 1,
    padding: 20,
    borderRadius: 8,
  },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  link: { marginTop: 10, color: "#007bff" },
});
