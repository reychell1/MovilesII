import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  setCart
} from "../redux/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    };
    loadCart();
  }, []);


  useEffect(() => {
    const saveCart = async () => {
      await AsyncStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
      );
    };
    saveCart();
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePay = async () => {
    Alert.alert("Compra realizada con éxito");
    dispatch(clearCart());
    await AsyncStorage.removeItem("cart");
  };

  const handleCancel = async () => {
    Alert.alert("Compra cancelada");
    dispatch(clearCart());
    await AsyncStorage.removeItem("cart");
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay productos en el carrito
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>
            Total a pagar: ${calculateTotal()}
          </Text>

          <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
            <Text style={styles.btnText}>Pagar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  deleteBtn: {
    marginTop: 8,
    backgroundColor: "red",
    padding: 6,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    textAlign: "center",
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  payBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  cancelBtn: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});