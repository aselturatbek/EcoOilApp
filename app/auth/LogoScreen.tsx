import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    'auth/LogoScreen': undefined;
    'auth/WelcomeScreen': undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'auth/LogoScreen'>;

const LogoScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('auth/WelcomeScreen');
        }, 3000); // 2 saniye sonra WelcomeScreen'e yönlendirilecek
    }, [navigation]);

    return (
        <ImageBackground  
        source={require('../assets/images/bglight.png')} 
        style={styles.background}
        imageStyle={styles.bgImage}>
            <View style={styles.container}>
            <Image source={require('../assets/images/EcoOil_LOGO_TEXT_Transparan.png')} style={styles.logo} />
        </View>
        </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        shadowColor: 'beige',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    bgImage: {
        opacity:0.7
    }
});

export default LogoScreen;
