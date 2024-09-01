
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";



type RootStackParamList = {
  'auth/WelcomeScreen': undefined;
  'auth/LoginScreen': undefined;
  main: undefined;
  // Diğer ekranlarınız
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;


function RegisterScreen() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/earth_3d.png')} style={styles.image} />
      <Text style={styles.title}>Let’s Create Account</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TextInput style={styles.input} placeholder="Enter your phone number" />
      <TextInput style={styles.input} placeholder="Create your password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm your password" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('auth/LoginScreen')}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
        <Text style={styles.linkText}>Already have an Account? Sign-In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

















