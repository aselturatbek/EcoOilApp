import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/constants";
import {useUser} from "@/app/auth/UserContext";

type RootStackParamList = {
    'auth/WelcomeScreen': undefined;
    'auth/RegisterScreen': undefined;
    'main': undefined;
};
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'auth/WelcomeScreen'>;

interface Props {
    navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const { user, setUser } = useUser();

    useEffect(() => {
        AsyncStorage.getItem('user').then((storedUser) => {
            if (storedUser) {
                setLoggedUser(JSON.parse(storedUser));
                setUser(JSON.parse(storedUser));
            }
        });
    }, []);

    const handleGetStarted = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            navigation.navigate('main');
        } else {
            navigation.navigate('auth/RegisterScreen');
        }
    };

    return (
        <ImageBackground source={require('../assets/images/bglight.png')} style={styles.container} imageStyle={styles.bg}>
            <View style={styles.overlay}>
                <Image source={require('../assets/images/earth_3d.png')} style={styles.image} />
                <Text style={styles.title}>Welcome to EcoLab!</Text>
                <Text style={styles.subtitle}>Join us in our mission to make recycling effortless and impactful!</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGetStarted}
                >
                    <Text style={styles.buttonText}>Let's Get Started :)</Text>
                </TouchableOpacity>
                <Text style={styles.subtitle1}>Follow us on social media</Text>
                <View style={styles.socialIcons}>
                    <Icon name="instagram" size={30} color="#004d40" style={styles.icon} />
                    <Icon name="twitter" size={30} color="#004d40" style={styles.icon} />
                    <Icon name="linkedin" size={30} color="#004d40" style={styles.icon} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        opacity: 0.6,
    },
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 250,
        height: 300,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#004d40',
        shadowColor: '#004d40',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 6,
        shadowRadius: 15,
        elevation: 5,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#004d40',
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    button: {
        backgroundColor: '#004d40',
        marginTop: 70,
        paddingVertical: 12,
        paddingHorizontal: 36,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    subtitle1: {
        fontSize: 12,
        color: '#004d40',
        marginTop: 100,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default WelcomeScreen;
