import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import API from "../services/api";

export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      
      <Text style={styles.header}>Fake Store</Text>
      <Text style={styles.category}>Categoría:</Text>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />


      <View style={styles.footer}>
        <Text style={styles.footerText}>Primera Prueba Parcial</Text>
        <Text style={styles.footerText}>Desarrollado por:</Text>
        <Text style={styles.footerText}>Reychell Espinoza</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#3f0766",
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    paddingBottom: 120,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 12,
  },
  price: {
    marginTop: 5,
    color: "green",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#461966",
    padding: 15,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});