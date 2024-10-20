import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

type RootStackParamList = {
    'auth/WelcomeScreen': undefined;
    'auth/LoginScreen': undefined;
    main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'auth/LoginScreen'>;

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();

    // Butonun büyüklüğünü kontrol etmek için SharedValue oluşturuyoruz
    const scale = useSharedValue(1);

    // Animasyonlu stil
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const handlePressIn = () => {
        // Butona basıldığında hafifçe büyütüyoruz
        scale.value = withSpring(1.1);
    };

    const handlePressOut = () => {
        // Bırakıldığında eski haline dönüyor
        scale.value = withSpring(1);
        navigation.navigate('auth/LoginScreen');
        console.log("Başla butonuna tıklandı!");
    };

    return (
        <ImageBackground
            source={require('../assets/images/bglight.png')} // Buraya kendi arka plan resmini koy
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.carouselItem}>
                    <Image source={require('../assets/images/carousel_1.png')} style={styles.image} />
                    <Text style={styles.title}>
                        <Text style={styles.boldTitle}>EcoOil ile {'\n'}Atık Yağları </Text>{'\n'}
                        <Text style={styles.thinTitle}>geri dönüştür!</Text>
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Animated.View style={[styles.startButton, animatedStyle]}>
                            <Text style={styles.navButtonText}>Tamam</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 150
    },
    carouselItem: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: -40,
    },
    boldTitle: {
        fontWeight: 'bold',
        color: '#004d40',
        fontSize: 35,
        fontFamily: 'Montserrat-Bold',
    },
    thinTitle: {
        fontWeight: 'bold',
        color: '#004d40',
        fontSize: 32,
        fontFamily: 'Montserrat-Regular',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 150,
        marginTop: 20,
    },
    startButton: {
        backgroundColor: '#004d40',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 17,
        marginHorizontal: 10,
        shadowColor: '#004d40',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 50,
        width: 180,
        height: 40,
    },
    navButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
});

export default WelcomeScreen;
