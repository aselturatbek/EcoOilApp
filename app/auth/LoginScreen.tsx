
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
  main: undefined;
  'auth/RegisterScreen': undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

function LoginScreen() {
  const navigation = useNavigation<NavigationPropType>();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/earth_3d.png')} style={styles.image} />
      <Text style={styles.title}>Hey, Welcome Back</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
      <TouchableOpacity>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('main')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('auth/RegisterScreen')}>
        <Text style={styles.linkText}>Don’t have an Account? Sign-Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
