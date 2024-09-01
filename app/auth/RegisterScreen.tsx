import React from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';

// Define types
type RootStackParamList = {
  'auth/WelcomeScreen': undefined;
  'auth/LoginScreen': undefined;
  main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <ImageBackground source={require('../assets/images/bgfiligran.png')} style={styles.background} imageStyle={styles.bgImage}>
      <View style={styles.container}>
        <Image source={require('../assets/images/earth_3d.png')} style={styles.image} />
        <Text style={styles.title}>Let’s Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#004d40"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#004d40"
        />
        <TextInput
          style={styles.input}
          placeholder="Create your password"
          secureTextEntry
          placeholderTextColor="#004d40"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry
          placeholderTextColor="#004d40"
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('auth/LoginScreen')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
          <Text style={styles.linkText}>Already have an Account? Sign-In</Text>
        </TouchableOpacity>
        <View style={styles.socialContainer}>
          
        </View>
      </View>
      <View style={styles.socialIcons}>
          <Icon name="instagram" size={30} color="#004d40" style={styles.icon} />
          <Icon name="twitter" size={30} color="#004d40" style={styles.icon} />
          <Icon name="linkedin" size={30} color="#004d40" style={styles.icon} />
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background covers the entire screen
  },
  bgImage:{
    opacity:0.6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 45,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    width: '85%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 0.4,
    borderColor: '#004d40',
    borderRadius: 15,
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  linkText: {
    color: '#004d40',
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  socialContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 5,
    width: '80%',
  },
  socialButtonText: {
    color: '#004d40',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    marginBottom:40,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:80,
  },
});

export default RegisterScreen;
