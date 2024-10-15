import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

// Define types
type RootStackParamList = {
    'auth/WelcomeScreen': undefined;
    'auth/RegisterScreen': undefined;
    main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // API çağrısını yorum satırına aldım
        // axios.post('http://localhost:8000/api/login', {
        //     email: email,
        //     password: password,
        // }).then(response => {
        //     console.log(response.data);
        //     navigation.navigate('main');
        // }).catch(error => {
        //     console.error('Login Error: ', error);
        //     alert('Login failed. Please try again.');
        // });

        // Doğrudan ana ekrana yönlendir
        navigation.navigate('main');
    };

    return (
        <ImageBackground source={require('../assets/images/bglight.png')} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container1}></View>
                <View style={styles.container}>
                    <Text style={styles.title}>Log In</Text>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#004d40" style={styles.inputIcon} />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry
                            placeholderTextColor="#004d40"
                        />
                    </View>

                    <TouchableOpacity onPress={() => {/* Şifreyi unuttum sayfasına yönlendir */}} >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('auth/RegisterScreen')}>
                        <Text style={styles.linkText}>Don't have an Account? Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.socialIcons}>
                        <Icon name="instagram" size={30} color="#004d40" style={styles.icon} />
                        <Icon name="twitter" size={30} color="#004d40" style={styles.icon} />
                        <Icon name="linkedin" size={30} color="#004d40" style={styles.icon} />
                    </View>
                    <Text style={styles.footerText}>Get In Touch With Us.</Text>
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
        fontSize: 25,
        fontWeight: 'bold',
        color: '#004d40',
        marginBottom: 30,
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
        marginBottom: 10,
        paddingLeft: 10,
        elevation: 6,
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
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    linkText: {
        color: '#004d40',
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        textDecorationLine: 'underline',
    },
    footerText: {
        color: '#004d40',
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    forgotPasswordText: {
        color: '#004d40',
        marginBottom: 20,
        textAlign: 'left',
        marginTop: 10,
        marginRight: 150,
        width: '85%',
        fontFamily: 'Montserrat-Regular',
        textDecorationLine: 'underline',
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
    },
    icon: {
        marginHorizontal: 10,
        marginBottom: 30,
        transform: [{ scale: 0.9 }],
    },
});

export default LoginScreen;
