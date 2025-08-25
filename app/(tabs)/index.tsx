import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

type Cloth = {
  _id: string;
  name: string;
  price: number;
  size: string;
  description: string;
  image: string;
};

export default function HomePage() {
  const { width } = useWindowDimensions();
  const numColumns = width > 1024 ? 4 : width > 768 ? 3 : 2;
  const imageHeight = width > 768 ? 550 : 350;

  const [cloths, setCloths] = useState<Cloth[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetch("http://172.20.25.20:5000/cloth")
      .then((res) => res.json())
      .then((data) => setCloths(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (item: Cloth) => {
    const size = selectedSizes[item._id] || "M";
    console.log("Added to cart:", { ...item, size });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Page Heading */}
      <ThemedText type="title" style={styles.heading}>
        Today&apos;s Trends..
      </ThemedText>

      <FlatList
        data={cloths}
        key={numColumns}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={[styles.image, { height: imageHeight }]}
              resizeMode="cover"
            />

            {/* Centered content */}
            <View style={styles.contentCenter}>
              <ThemedText type="title" style={{ fontSize: 20 }}>{item.name}</ThemedText>
              <ThemedText>₹{item.price}</ThemedText>

              {/* Size Picker */}
              <Picker
                selectedValue={selectedSizes[item._id] || "M"}
                onValueChange={(value) =>
                  setSelectedSizes((prev) => ({ ...prev, [item._id]: value }))
                }
                style={styles.picker}
              >
                <Picker.Item label="S" value="S" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="L" value="L" />
                <Picker.Item label="XL" value="XL" />
              </Picker>

              <ThemedText numberOfLines={2} style={styles.description}>
                {item.description}
              </ThemedText>

              {/* Add to Cart button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddToCart(item)}
              >
                <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "monospace",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "monospace"
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#eac7b9ff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    margin: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 10,
  },
  contentCenter: {
    alignItems: "center", 
  },
  picker: {
    height: 40,
    borderRadius: 15,
    borderColor: "#ccc",
    marginVertical: 5,
    width: 120, 
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#e3b19eff",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
