import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from "@/app/auth/UserContext";
import Constants from 'expo-constants';
import { TextInputMask } from 'react-native-masked-text';

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

type RootStackParamList = {
    'auth/LoginScreen': undefined;
    main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'main'>;

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();
    const { setUser } = useUser();

    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const surnameInputRef = useRef<TextInput>(null);
    const phoneInputRef = useRef<TextInputMask>(null);
    const mailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleNextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleRegister = async () => {
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    phone,
                    username,
                    email,
                    password,
                }),
            });
    
            const responseText = await response.text();
            console.log("API Yanıtı:", responseText);
    
            if (!response.ok) {
                throw new Error('Kayıt başarısız.');
            }
    
            const user = JSON.parse(responseText);
            setUser(user);
            setStep(3);
            setTimeout(() => {
                navigation.navigate('auth/LoginScreen');
            }, 2000);
        } catch (error) {
            console.error("Hata:", error);
            alert("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
        }
    };
    

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map((stepNum, index) => (
            <React.Fragment key={stepNum}>
              <View
                style={[styles.circle, { 
                  backgroundColor: step >= stepNum ? '#004d40' : '#ddd',
                  width: step === stepNum && stepNum !== 3 ? 120 : 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: step === stepNum && stepNum !== 3 ? 10 : 0,
                }]}
              >
                {step > stepNum || (step === 3 && stepNum === 3) ? (
                  <Icon name="check" size={20} color="#fff" />
                ) : step === stepNum ? (
                  <Text style={styles.stepTextActive}>
                    {stepNum === 1 ? 'Kişisel Bilgiler' : stepNum === 2 ? 'Güvenlik' : 'Hoş Geldin'}
                  </Text>
                ) : (
                  <Text style={styles.stepText}>{stepNum}</Text>
                )}
              </View>
              {index < 2 && <View style={styles.stepLine} />}
            </React.Fragment>
          ))}
        </View>
    );

    return (
        <ImageBackground source={require('../assets/images/bglight.png')} style={styles.backgroundImage}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        
                        {step === 1 && (
                            <>
                            <Text style={styles.title}>EcoOil’e</Text>
                            <Text style={styles.subtitle}>Kayıt Ol.</Text>

                            {renderStepIndicator()}
                                <View style={styles.rowContainer}>
                                    <View style={styles.inputHalf}>
                                        <Text style={styles.label}>Ad</Text>
                                        <TextInput
                                            value={name}
                                            onChangeText={setName}
                                            style={styles.input}
                                            placeholderTextColor="#004d40"
                                            returnKeyType="next"
                                            onSubmitEditing={() => surnameInputRef.current?.focus()}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={styles.inputHalf}>
                                        <Text style={styles.label}>Soyad</Text>
                                        <TextInput
                                            value={surname}
                                            onChangeText={setSurname}
                                            style={styles.input}
                                            placeholderTextColor="#004d40"
                                            ref={surnameInputRef}
                                            returnKeyType="next"
                                        
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.labelPhone}>Telefon Numarası</Text>
                                <TextInputMask
                                    type={'custom'}
                                    options={{
                                        mask: '+90 (999) 999 99 99',
                                    }}
                                    value={phone}
                                    onChangeText={setPhone}
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholderTextColor="#004d40"
                                    placeholder='+99 (999) 999 99 99'
                                    ref={phoneInputRef}  // Ref kullanmaya devam edebilirsin, ama focus() kullanmayacağız
                                    returnKeyType="done"
                                    onSubmitEditing={() => Keyboard.dismiss()}  // focus() olmadan kullanıyoruz
                                />

                                <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                                    <Text style={styles.buttonText}>Devam Et</Text>
                                </TouchableOpacity>
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Hesabın zaten var mı? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
                                        <Text style={styles.loginLink}>Giriş Yap</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {step === 2 && (
                            <>
                            <Text style={styles.title}>EcoOil’e</Text>
                            <Text style={styles.subtitle}>Kayıt Ol.</Text>

                            {renderStepIndicator()}
                            <Text style={styles.label2}>Kullanıcı Adı</Text>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    style={styles.input}
                                    placeholderTextColor="#004d40"
                                    returnKeyType="next"
                                    onSubmitEditing={() => mailInputRef.current?.focus()}
                                    blurOnSubmit={false}
                                />
                                <Text style={styles.label2}>Mail Adresi</Text>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    keyboardType="email-address" 
                                    ref={mailInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                                    blurOnSubmit={false}
                                />
                                <Text style={styles.label2}>Şifre</Text>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    style={styles.input}
                                    secureTextEntry
                                    placeholderTextColor="#004d40"
                                    ref={passwordInputRef}
                                    returnKeyType="done"
                                    onSubmitEditing={() => Keyboard.dismiss()}  
                                />
                                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                                </TouchableOpacity>
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Hesabın zaten var mı? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('auth/LoginScreen')}>
                                        <Text style={styles.loginLink}>Giriş Yap</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {step === 3 && (
                            <View>
                                <Text style={styles.titleWelcome}>EcoOil’e</Text>
                                <Text style={styles.subtitleWelcome}>Hoşgeldin.</Text>
                            </View>
                        )}

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingTop: 100
    },
    container: {
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
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
    titleWelcome: {
        fontSize: 46,
        fontWeight: 'bold',
        color: '#004d40',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        marginTop: 230
    },
    subtitleWelcome: {
        fontSize: 44,
        color: '#004d40',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 45,
    },
    circle: {
        width: 50,
        height: 35,
        borderRadius: 14,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    },
    stepTextActive: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    },
    stepLine: {
        width: 68,
        height: 2,
        backgroundColor: '#004d40',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputHalf: {
        width: '48%',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#004d40',
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10
    },
    label2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#004d40',
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'flex-start'
    },
    labelPhone: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#004d40',
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        marginRight: 190
    },
    input: {
        width: '100%',
        height: 45,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontFamily: 'Montserrat-Regular',
    },
    button: {
        backgroundColor: '#004d40',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 25,
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        color: '#000',
        fontFamily: 'Montserrat-Regular',
    },
    loginLink: {
        color: '#004d40',
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
});

export default RegisterScreen;
