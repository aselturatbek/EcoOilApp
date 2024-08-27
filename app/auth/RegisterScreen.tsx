import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  'auth/WelcomeScreen': undefined;
  'auth/LoginScreen': undefined;
  main:undefined;
  // Diğer ekranlarınız
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

function RegisterScreen() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <ImageBackground style={styles.container} source={require('../assets/images/bgheader.jpg')}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınız"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('main')}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Zaten bir hesabınız var mı?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
            <Text style={styles.loginLink}>Giriş Yap</Text>
          </TouchableOpacity>
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
    padding: width * 0.05,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 21,
    padding: 20,
    elevation: 5, // Android için
    shadowColor: "#000", // iOS için
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#121212',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6fdb64',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
    elevation: 5, // Android için
    shadowColor: "#000", // iOS için
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#888',
  },
  loginLink: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#6fdb64',
    marginLeft: 5,
  },
});

export default RegisterScreen;
