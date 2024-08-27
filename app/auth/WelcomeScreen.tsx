import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Tanımlaman gereken türler
type RootStackParamList = {
  Welcome: undefined;
  'auth/RegisterScreen': undefined; // 'Home' yerine 'Main' kullanacağız
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('auth/RegisterScreen')} // Burayı 'Main' olarak güncelledik
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Açık gri arka plan
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Koyu gri metin
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6fdb64', // Yeşil arka plan
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5, // Android için gölge
    shadowColor: '#000', // iOS için gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff', // Beyaz metin
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
