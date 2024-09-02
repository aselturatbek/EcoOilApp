import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust according to your icons package


// Define types
type RootStackParamList = {
  Welcome: undefined;
  'auth/RegisterScreen': undefined;
};
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/images/bgfiligran.png')} style={styles.container} imageStyle={styles.bg}>
      <View style={styles.overlay}>
        <Image source={require('../assets/images/earth_3d.png')} style={styles.image} />
        <Text style={styles.title}>EcoOil'e Hoşgeldin!</Text>
        <Text style={styles.subtitle}>Hızla uygulamanın tasarımını keşfet!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('auth/RegisterScreen')}>
          <Text style={styles.buttonText}>Hadi Başlayalım :)</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle1}>Bizim sosyal medya hesapları</Text>
        <View style={styles.socialIcons}>
          <Icon name="instagram" size={30} color="#004d40" style={styles.icon} />
          <Icon name="twitter" size={30} color="#004d40" style={styles.icon} />
          <Icon name="linkedin" size={30} color="#004d40" style={styles.icon} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg:{
    opacity:0.6,

  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 250, // Increased logo size
    height: 300, // Increased logo size
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#004d40', // Updated title color
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 6,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
  subtitle: {
    fontSize: 16,
    color: '#004d40',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: '#004d40', // Updated button color
    marginTop: 70,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
  subtitle1: {
    fontSize: 12,
    color: '#004d40',
    marginTop: 100,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default WelcomeScreen;
