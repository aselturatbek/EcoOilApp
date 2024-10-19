import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useUser} from "@/app/auth/UserContext";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

// Define types
type RootStackParamList = {
    'auth/WelcomeScreen': undefined;
    'auth/LoginScreen': undefined;
    main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();
    const { setUser } = useUser();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const handleRegister = async () => {
        if (password !== passwordAgain) {
            alert("Şifreler uyuşmuyor. Tekrar deneyin.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    name,
                    surname,
                    email,
                    phone,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Kayıt başarısız.');
            }

            const user = await response.json();

            // Set the user in context
            setUser(user);

            // Navigate to the main screen
            navigation.navigate('auth/LoginScreen');
        } catch (error) {
            console.error(error);
            alert("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
        }
    };
    return (
        <ImageBackground source={require('../assets/images/bglight.png')} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container1}></View>
                <View style={styles.container}>
                    <Text style={styles.title}>EcoOil'e Kayıt ol!</Text>

                    <View style={styles.inputContainer}>
                        <Icon name="user" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                            placeholder=" Kullanıcı adı giriniz.."
                            placeholderTextColor="#004d40"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            placeholder=" Adınızı giriniz.."
                            placeholderTextColor="#004d40"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={surname}
                            onChangeText={setSurname}
                            style={styles.input}
                            placeholder="Soyadınızı giriniz.."
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder="Mail adresinizi giriniz.."
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="phone" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                            placeholder="Telefon numaranızı giriniz.."
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholder="Şifre oluşturunuz.."
                            secureTextEntry
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={passwordAgain}
                            onChangeText={setPasswordAgain}
                            style={styles.input}
                            placeholder="Şifreyi tekrar giriniz.."
                            secureTextEntry
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <TouchableOpacity onPress={() => {/* Şifreyi unuttum sayfasına yönlendir */}}>
                        <Text style={styles.forgotPasswordText}>Şifrenizi mi unuttunuz?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        handleRegister();

                    }}>
                        <Text style={styles.buttonText}> Kayıt Ol !</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
                        <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap.</Text>
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
        paddingVertical: 20, // ScrollView padding for better spacing (Azaltıldı)
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, // İç boşluk azaltıldı
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100, // İç boşluk azaltıldı
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
        fontSize: 25,
        fontWeight: 'bold',
        color: '#004d40',
        marginBottom: 30, // Alt boşluk azaltıldı
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
        borderColor: 'white',
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
        fontSize:20,
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
