import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type RootStackParamList = {
    'auth/WelcomeScreen': undefined;
    'auth/LoginScreen': undefined;
    main: undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'auth/LoginScreen'>;

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();

    const handlePress = () => {
        navigation.navigate('auth/LoginScreen');
        console.log("Başla butonuna tıklandı!");
    };

    return (
        <ImageBackground
            source={require('../assets/images/bglight.png')} // Arka plan resmi
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
                    <TouchableOpacity style={styles.startButton} onPress={handlePress}>
                        <Text style={styles.navButtonText}>Tamam</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
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
