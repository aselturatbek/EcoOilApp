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
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

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
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/bgheader.jpg')}
    >
      <View style={styles.overlay}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Join Us</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre Giriniz"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('main')}
          >
            <LinearGradient
              colors={['#00c6ff', '#34eb7a']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 20,
    borderColor: '#34eb7a',
    borderWidth: 2,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#ccc',
  },
  loginLink: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#34eb7a',
    marginLeft: 5,
  },
});

export default RegisterScreen;
