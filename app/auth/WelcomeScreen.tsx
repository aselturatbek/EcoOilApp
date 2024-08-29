import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

// Tanımlaman gereken türler
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
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/bgheader.jpg')}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to the App!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('auth/RegisterScreen')}
        >
          <LinearGradient
            colors={['#00c6ff', '#34eb7a']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
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
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#6fedfg',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
