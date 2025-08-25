import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useContext(AuthContext)!; 
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://172.20.25.20:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login({ username });
        Alert.alert("Login Success", "Welcome!");
        router.replace("/(tabs)/admin"); 
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      Alert.alert("Error", String(err));
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/logo.jpeg")} style={styles.logo} />
      </View>

      <ThemedText type="title" style={styles.title}>
        Welcome Back!
      </ThemedText>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
          Login
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#ebd9d9ff" },
  logoContainer: { marginBottom: 30, borderRadius: 100, padding: 5 },
  logo: { width: 100, height: 150, borderRadius: 50 },
  title: { fontSize: 24, marginBottom: 20, color: "#333", fontFamily: "monospace",},
  input: {
    width: 400, height: 50, borderWidth: 1, borderColor: "#ccc",fontFamily: "monospace",
    borderRadius: 25, paddingHorizontal: 20, marginVertical: 10,
    backgroundColor: "#fff", color: "#000"
  },
  button: {
    width: 400, height: 50, backgroundColor: "#e3b19eff",fontFamily: "monospace",
    borderRadius: 25, justifyContent: "center", alignItems: "center", marginTop: 20
  },
});
