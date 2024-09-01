import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',  // Montserrat kullanımı
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',  // Montserrat kullanımı
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#77dd77',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',  // Montserrat kullanımı
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',  // Montserrat kullanımı
  },
  linkText: {
    color: '#77dd77',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',  // Montserrat kullanımı
  }
});

export default styles;
