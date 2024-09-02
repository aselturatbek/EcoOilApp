import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    <ImageBackground source={require('../assets/images/bgfiligran.png')} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require('../assets/images/purple.png')} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.title}>Cabuk kayit ol!</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#004d40" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#004d40"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <MaterialIcons name="phone" size={24} color="#004d40" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#004d40"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#004d40" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Create your password"
              secureTextEntry
              placeholderTextColor="#004d40"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={24} color="#004d40" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry
              placeholderTextColor="#004d40"
            />
          </View>

          <TouchableOpacity onPress={() => {/* Şifreyi unuttum sayfasına yönlendir */}}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('auth/LoginScreen')}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
            <Text style={styles.linkText}>Already have an Account? Sign-In</Text>
          </TouchableOpacity>
          
          <View style={styles.socialIcons}>
            <Icon name="instagram" size={30} color="#004d40" style={styles.icon} />
            <Icon name="twitter" size={30} color="#004d40" style={styles.icon} />
            <Icon name="linkedin" size={30} color="#004d40" style={styles.icon} />
          </View>
          <Text style={styles.footerText}>Buraya biseyler yazilcak.</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImageStyle: {
    opacity: 0.6,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // ScrollView padding for better spacing (Azaltıldı)
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // İç boşluk azaltıldı
  },
  image: {
    width: 390, // Increased logo size
    height: 320, // Increased logo size
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20, // Alt boşluk azaltıldı
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10, // Alt boşluk azaltıldı
    paddingLeft: 10, // Padding azaltıldı
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 13, // Dikey padding azaltıldı
    paddingHorizontal: 8, // Yatay padding azaltıldı
    fontFamily: 'Montserrat-Regular',
  },
  inputIcon: {
    marginRight: 8, // Sağ boşluk azaltıldı
    opacity: 0.6,
  },
  button: {
    backgroundColor: '#004d40',
    paddingVertical: 10, // Dikey padding azaltıldı
    paddingHorizontal: 40, // Yatay padding azaltıldı
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
    marginTop: 20, // Üst boşluk azaltıldı
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  linkText: {
    color: '#004d40',
    marginTop: 15, // Üst boşluk azaltıldı
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
  },
  footerText: {
    color: '#004d40',
    marginTop: 10, // Üst boşluk azaltıldı
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  forgotPasswordText: {
    color: '#004d40',
    marginBottom: 20, // Alt boşluk azaltıldı
    textAlign: 'left',
    marginTop:10,
    marginRight:150,
    width: '85%',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60, // Üst boşluk azaltıldı
  },
  icon: {
    marginHorizontal: 10, // Yatay boşluk azaltıldı
    marginBottom: 30, // Alt boşluk azaltıldı
    transform: [{ scale: 0.9 }],
  },
});




export default RegisterScreen;
