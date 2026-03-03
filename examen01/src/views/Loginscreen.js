import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
  try {
    const response = await API.post('/auth/login', {
      username: username.trim(),
      password: password.trim()
    });

    const token = response.data.token;

  
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", username.trim());

    Alert.alert("Login successful");

    navigation.replace("Products");

  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    Alert.alert("Login failed");
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fake Store Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});