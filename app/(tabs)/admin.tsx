import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminPage() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleAddCloth = async () => {
    if (!name || !price || !size || !description || !image) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      Alert.alert("Error", "Price must be a number");
      return;
    }

    try {
      const response = await fetch("http://172.20.25.20:5000/cloth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: priceNumber,
          size,
          description,
          image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Cloth added successfully!");
        setName("");
        setPrice("");
        setSize("");
        setDescription("");
        setImage("");
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to connect to server");
      console.error("Error:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#ebd9d9ff" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText type="title" style={styles.title}>
          Add New Cloth
        </ThemedText>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Cloth Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Size (e.g. S, M, L, XL)"
            value={size}
            onChangeText={setSize}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddCloth}>
            <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
              Add Cloth
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    fontWeight: "700",
  },
  form: {
    width: "100%", 
    maxWidth: 400, 
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#e3b19eff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
