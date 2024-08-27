import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  main: undefined;
  'auth/RegisterScreen': undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

function LoginScreen() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-photo/abstract-grunge-decorative-light-green-dark-green-background_1258-28378.jpg' }} // Replace with your background image URL
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>EcoOil</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('main')}
          >
            <LinearGradient
              colors={['#34eb7a', '#00c6ff']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('auth/RegisterScreen')}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 60,
  },
  logoText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#34eb7a',
  },
  innerContainer: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 20,
    borderColor: '#34eb7a',
    borderWidth: 2,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#34eb7a',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#ccc',
  },
  registerLink: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#34eb7a',
    marginLeft: 5,
  },
});

export default LoginScreen;
