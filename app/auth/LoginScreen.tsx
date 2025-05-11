import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { useUser } from '../auth/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Define types
type RootStackParamList = {
    'auth/WelcomeScreen': undefined;
    'auth/RegisterScreen': undefined;
    main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();
    const { setUser } = useUser();

    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("password");


    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/login`,
                { email, password });
            const userData = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigation.navigate('main');
        } catch (error) {
            console.error('Giriş başarısız.', error);
        }
    };

    const loadUserFromStorage = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    };

    useEffect(() => {
        loadUserFromStorage(); // Uygulama açıldığında kullanıcıyı yükle
    }, []);

    return (
        <ImageBackground source={require('../assets/images/bglight.png')} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container1}></View>
                <View style={styles.container}>
                <Text style={styles.title}>EcoOil’e</Text>
                <Text style={styles.subtitle}>Giriş Yap.</Text>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder="Mail adresinizi girin.."
                            placeholderTextColor="#004d40"
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholder="Şifrenizi girin.."
                            secureTextEntry
                            placeholderTextColor="#004d40"
                            autoCapitalize={'none'}
                        />
                    </View>

                    <TouchableOpacity onPress={() => {/* Şifreyi unuttum sayfasına yönlendir */}} >
                        <Text style={styles.forgotPasswordText}>Şifrenizi mi unuttunuz?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Giriş Yap</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('auth/RegisterScreen')}>
                        <Text style={styles.linkText}>
                        Henüz hesabın yok mu?  <Text style= {styles.linkText2}>
                              Kayıt ol.
                            </Text>
                            </Text>
                    </TouchableOpacity>

                    <View style={styles.socialIcons}>
                        <Icon name="instagram" size={30} color="#004d40" style={styles.icon} />
                        <Icon name="twitter" size={30} color="#004d40" style={styles.icon} />
                        <Icon name="linkedin" size={30} color="#004d40" style={styles.icon} />
                    </View>
                    <Text style={styles.footerText}>Bizi takip edin.</Text>
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
        paddingVertical: 20,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
    },
    title: {
        fontSize: 36,
        color: '#004d40',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    subtitle: {
        fontSize: 34,
        color: '#004d40',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 10,
        paddingLeft: 10,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 13,
        paddingHorizontal: 8,
        fontFamily: 'Montserrat-Regular',
    },
    inputIcon: {
        marginRight: 8,
        opacity: 0.6,
        fontSize: 20,
    },
    button: {
        backgroundColor: '#004d40',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    linkText: {
        color: '#004d40',
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',

    },
    linkText2: {
        color: '#004d40',
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',

    },
    footerText: {
        color: '#004d40',
        marginTop: -20,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    forgotPasswordText: {
        color: '#004d40',
        marginBottom: 20,
        textAlign: 'left',
        marginTop: 10,
        marginRight: 140,
        width: '85%',
        fontFamily: 'Montserrat-Regular',
        textDecorationLine: 'underline',
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 130,
    },
    icon: {
        marginHorizontal: 10,
        marginBottom: 30,
        transform: [{ scale: 0.9 }],
    },
});

export default LoginScreen;
