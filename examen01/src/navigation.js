import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector, useDispatch } from "react-redux";
import { setCart } from "./redux/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./views/Loginscreen";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";

const Stack = createNativeStackNavigator();

export default function Navigation() {

  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          dispatch(setCart(JSON.parse(savedCart)));
        }
      } catch (error) {
        console.log("Error loading cart:", error);
      }
    };

    loadCart();
  }, []);

 
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(
          "cart",
          JSON.stringify(cartItems)
        );
      } catch (error) {
        console.log("Error saving cart:", error);
      }
    };

    saveCart();
  }, [cartItems]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Detail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}